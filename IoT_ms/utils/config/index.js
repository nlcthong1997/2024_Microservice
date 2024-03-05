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
    },
    rsa: {
        publicKey: `-----BEGIN PUBLIC KEY-----
            MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALs8WW06Why/CGKUZIwl1I8iiv+mWb3l
            8Z16FiadkxQd0T/HBCfEq/UMrcToHl4AVPrznF3oszexwgKH8HMHs60CAwEAAQ==
            -----END PUBLIC KEY-----`
    }
}

export default config;