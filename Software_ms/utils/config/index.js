const config =  {
    rabbitMQ: {
        Bank: {
            url: 'amqp://localhost',
            exchangeName: 'BankExchange'
        },
        Log: {
            url: 'amqp://localhost',
            exchangeName: 'LogExchange'
        }
    }
}

export default config;