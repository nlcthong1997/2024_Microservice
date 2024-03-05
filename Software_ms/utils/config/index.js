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
            MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJc2TML5+soGFT4z+0wyofl58gL1zsfv
            DzwhecwttMRjFiGdCWVPElsR+qu1yFnkLSOfEIEkDhSYrZqhpBDPG5sCAwEAAQ==
            -----END PUBLIC KEY-----`
    }
}

export default config;