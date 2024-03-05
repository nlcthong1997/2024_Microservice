import express from 'express';
import Producer from "./producer.js";
import { randomString } from "./utils/common.js";

const app = express();
const producer = new Producer('Bank');
const port = 3001;
let interval;
let count = 0;

const fakeData = (qty = 1) => {
    const data = [];
    for (let i = 1; i <= qty; i++) {
        data.push({
            id: `transaction_IoT_${randomString(10)}`,
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
    await producer.publish('payment', dataSender);
}

app.get('/payment', async (req, res) => {
    await fakePayment();
    res.send('Paid');
});

app.get('/multiple-payment', async (req, res) => {
    if (!interval) {
        console.log('-------> Begin multiple payment by IoT');
        interval = setInterval( async () => {
            let dataSender = fakeData();
            await producer.publish('payment', dataSender);
            count++;
            console.log(`Payment ${count}`);
        }, 10);

        res.send('Begin mutiple payment IoT');
    } else {
        res.send('Multipe payment are processing.');
    }
});

app.get('/stop-multiple-payment', (req, res) => {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
        console.log('-------> Stop multiple payment IoT')
        res.send('Stop multiple payment');
    } else {
        res.send('Multipe payment are not running.');
    }
});

app.listen(port, () => {
    console.log(`Server IoT PAYMENT is running at http://localhost:${port}`);
});