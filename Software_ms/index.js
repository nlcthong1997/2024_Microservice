import express from 'express';
import Producer from "./producer.js";
import { randomString } from "./utils/common.js";
import NodeRSA from 'node-rsa';
import config from './utils/config/index.js';

const app = express();
const producer = new Producer('Bank');
const port = 3000;
let interval;
let count = 0;

// rsa encrypt
const publicKey = config.rsa.publicKey;
const key = new NodeRSA(publicKey, 'pkcs8-public-pem');

const fakeData = (qty = 1) => {
    const data = [];
    for (let i = 1; i <= qty; i++) {
        data.push({
            id: `transaction_SOFTWARE_${randomString(10)}`,
            amount: Math.floor(Math.random() * 10),
            name: `customer_${i}_${randomString(10)}`,
            time: new Date(),
            isError: Math.floor(Math.random() * 10)%2
        });
    }
    return data;
}

const fakePayment = async () => {
    const dataSender = fakeData();
    // encrypt rsa
    const encryptedData = key.encrypt(JSON.stringify(dataSender), 'base64');
    // send to message queue
    await producer.publish('payment', { from: 'Software', encryptedData });
}

app.get('/payment', async (req, res) => {
    await fakePayment();
    res.send('Paid');
});

app.get('/multiple-payment', async (req, res) => {
    if (!interval) {
        console.log('-------> Begin multiple payment');
        interval = setInterval( async () => {
            let dataSender = fakeData();
            // encrypt rsa
            const encryptedData = key.encrypt(JSON.stringify(dataSender), 'base64');
            // send to message queue
            await producer.publish('payment', { from: 'Software', encryptedData });
            count++;
            console.log(`Payment ${count}`);
        }, 10);

        res.send('Begin mutiple payment');
    } else {
        res.send('Multipe payment are processing.');
    }
});

app.get('/stop-multiple-payment', (req, res) => {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
        console.log('-------> Stop multiple payment')
        res.send('Stop multiple payment');
    } else {
        res.send('Multipe payment are not running.');
    }
});

app.listen(port, () => {
    console.log(`Server SOFTWARE PAYMENT is running at http://localhost:${port}`);
});