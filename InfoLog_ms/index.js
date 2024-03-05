import amqplib from 'amqplib';
import config from './utils/config/index.js';
import fs from 'fs'

let logChannel;

async function consumeMessage() {
    const logUrl = config.rabbitMQ['Log'].url;
    const logExchangeName = config.rabbitMQ['Log'].exchangeName;
    const logConn = await amqplib.connect(logUrl);
    logChannel = await logConn.createChannel();
    
    const queueLog = 'QueueInfoLog';
    const routingKeyInfoLog = 'infoLog'; // need same producer
    // const routingKeyErrorLog = 'errorLog'; // need same producer

    // Declare exchange and queue
    await logChannel.assertExchange(logExchangeName, 'direct', { durable: false });
    const q = await logChannel.assertQueue(queueLog, { durable: false });

    // can use queueName or q.queue
    await logChannel.bindQueue(q.queue, logExchangeName, routingKeyInfoLog);
    // await logChannel.bindQueue(q.queue, logExchangeName, routingKeyErrorLog);

    // Consume messages from the queue
    await logChannel.consume(q.queue, handleMessage);
}

// Handle incoming messages
const handleMessage = (msg) => {
    if (msg) {
        let filePath;
        const dataReceive = JSON.parse(msg.content);
        // if (dataReceive.isError) {
        //     filePath = '../logs/log_erro.txt';
        // } else {
        //     filePath = '../logs/log_info.txt';
        // }
        filePath = '../logs/log_info.txt';
        fs.appendFileSync(filePath, `${JSON.stringify(dataReceive)}\n`);
        console.log(`Receive log info: ${JSON.stringify(dataReceive)}`);
        logChannel.ack(msg);
    }
}

consumeMessage();
