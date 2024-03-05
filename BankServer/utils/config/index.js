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
        IoTService: {
            privateKey: `-----BEGIN PRIVATE KEY-----
                MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAuzxZbTpaHL8IYpRk
                jCXUjyKK/6ZZveXxnXoWJp2TFB3RP8cEJ8Sr9QytxOgeXgBU+vOcXeizN7HCAofw
                cwezrQIDAQABAkBHI1LG0VjTezFwYvkg1m7AQ1uUblvCbs8yCeTIny32ggZxlYlm
                uDmEuYv7K4E+PKuUngXTlQ+FWSyBlMkVR3UBAiEA8sO6bozwN1ZOr1awFr9X8R+l
                EGRxRrMDHMIACt+XtrECIQDFcZqOfNVbm0wc5Xw1vlhX1ceXmKE3MjhvRLZXDu3D
                vQIhANn29nqvvDZTHY68TJn/7pumB/Qx2qrZq1+0p4kbvAHhAiA59iKgJ6desBVE
                +l1fTZSTnG9uYmEZWgXVLD+3COvlpQIgQzzpCAVk72P3wCQ5Oet94OzC4jSsGLkJ
                98nFnIrRVq0=
                -----END PRIVATE KEY-----`
        },
        SoftwareService: {
            privateKey: `-----BEGIN PRIVATE KEY-----
                MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAlzZMwvn6ygYVPjP7
                TDKh+XnyAvXOx+8PPCF5zC20xGMWIZ0JZU8SWxH6q7XIWeQtI58QgSQOFJitmqGk
                EM8bmwIDAQABAkAqI0ia4PyhRbavwd6aqlV25yOo7YT1NEpDkHSXkHkabK9Zobzf
                Vf7ha37CEH/WN8pdVnNM3BD0yLSqBj7roKkpAiEA5osXo/gF++yDH/N2XbunNZBG
                rZ+dnK2Y7rkQBrUCuFUCIQCn6LQ1ENevCJqnj/VECDqhzR0VapineDeVsA+BfmY0
                LwIhAMip2nrSv8ql8v/VdnphgknB+XLYEmS0SP/IPqXH2cU9AiBhAcFzUxq5BiiL
                nFEgD/0H07/0ypQNVRgQBBrBPqx/gwIhAJ4V3UdUwhAvaUOnMvDrOuakiiumzs+H
                xfjWpN0CHx1p
                -----END PRIVATE KEY-----`
        }
    }
}

export default config;