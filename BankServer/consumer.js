import amqplib from 'amqplib';
import config from './utils/config/index.js';
import Producer from './producer.js';

let bankChannel;
const logProducer = new Producer('Log');

async function consumeMessage() {
    const bankUrl = config.rabbitMQ['Bank'].url;
    const bankExchangeName = config.rabbitMQ['Bank'].exchangeName;
    const bankConn = await amqplib.connect(bankUrl);
    bankChannel = await bankConn.createChannel();
    
    const queuePayment = 'QueuePayment';
    const routingKeyPayment = 'payment'; // need same producer

    // Declare exchange and queue
    await bankChannel.assertExchange(bankExchangeName, 'direct', { durable: false });
    const q = await bankChannel.assertQueue(queuePayment, { durable: false });

    // can use queueName or q.queue
    await bankChannel.bindQueue(q.queue, bankExchangeName, routingKeyPayment);

    // Consume messages from the queue
    await bankChannel.consume(q.queue, handleMessage);
}

// Handle incoming messages
const handleMessage = async (msg) => {
    if (msg) {
        const dataReceive = JSON.parse(msg.content);
        const routingKeyErrorLog = 'errorLog';
        const routingKeyInfoLog = 'infoLog';
        for (let i = 0; i < dataReceive.length; i++) {
            let routingKey = dataReceive[i].isError ? routingKeyErrorLog : routingKeyInfoLog;
            console.log(`Receive customer ${dataReceive[i].name} and send log to ${routingKey}`);
            await logProducer.publish(routingKey, {
                id: dataReceive[i].id, 
                amount: dataReceive[i].amount,  
                isError: dataReceive[i].isError
            });
        }
        bankChannel.ack(msg);
    }
    
}

consumeMessage();
