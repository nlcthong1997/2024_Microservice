import amqplib from 'amqplib';
import config from "./utils/config/index.js";

class Producer {
    name;
    channel;

    constructor (name) {
        this.name = name;
    }

    create = async () => {
        const url = config.rabbitMQ[this.name].url;
        const conn = await amqplib.connect(url);
        this.channel = await conn.createChannel();
    }

    publish = async (routingKey, dataSender) => {
        if (!this.channel) {
            await this.create();
        }

        const exchangeName = config.rabbitMQ[this.name].exchangeName;
        await this.channel.assertExchange(exchangeName, 'direct', { durable: false });

        await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(dataSender)));

        console.log(`Producer ${this.name} send to ${routingKey}`);
    }
}

export default Producer;