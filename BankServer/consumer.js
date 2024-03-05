import amqplib from 'amqplib';
import config from './utils/config/index.js';
import Producer from './producer.js';
import NodeRSA from 'node-rsa';
import fs from 'fs';
import { ddmmyyyHHmmss } from './utils/common.js';

let bankChannel;
const logProducer = new Producer('Log');
// decrypt data
const privateKeyIoT = config.rsa.IoTService.privateKey;
const keyIoT = new NodeRSA(privateKeyIoT, 'pkcs8-private-pem');
const privateKeySoftware = config.rsa.SoftwareService.privateKey;
const keySoftware = new NodeRSA(privateKeySoftware, 'pkcs8-private-pem');

const storeDb = async (data) => {
    let filePath = '../logs/db.txt';
    fs.appendFileSync(filePath, `${ddmmyyyHHmmss()} | ${JSON.stringify(data)}\n`);
}

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
        const routingKeyErrorLog = 'errorLog';
        const routingKeyInfoLog = 'infoLog';
        
        let data = null;

        const dataReceive = JSON.parse(msg.content);
        if (dataReceive.from == 'IoT') {
            data = keyIoT.decrypt(dataReceive.encryptedData, 'utf-8');
        }
        if (dataReceive.from == 'Software') {
            data = keySoftware.decrypt(dataReceive.encryptedData, 'utf-8');
        } 
        data = JSON.parse(data);

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let routingKey = data[i].isError ? routingKeyErrorLog : routingKeyInfoLog;
                console.log(`Receive customer ${data[i].name} and send log to ${routingKey}`);

                await storeDb({
                    id: data[i].id, 
                    name: data[i].name,
                    amount: data[i].amount  
                })

                // send to message queue
                await logProducer.publish(routingKey, {
                    id: data[i].id, 
                    amount: data[i].amount,  
                    isError: data[i].isError
                });
            }
            bankChannel.ack(msg);
        }
    }
    
}

consumeMessage();
