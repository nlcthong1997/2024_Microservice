```bash
Setup
    1/ Download https://www.erlang.org/downloads
    2/ Download https://www.rabbitmq.com/docs/install-windows#downloads
    3/ Install tool
    4/ Open Rabbit Command Prombt (sbin dir): rabbitmq-plugins enable rabbitmq_management
    5/ Windown -> Service -> RabbitMQ -> Restart
    6/ Access Rabbit manager: localhost:15672 (guest/guest)

Services:
    Bankserver
        - consumer: nhận thông tin payment từ IoT và Software
        - producer: sau khi nhận thông tin payment sẽ tạo log đến Log service (info, error)
        - Store data

    IoT & Software
        - producer: tạo payment đến Bank

    Info & Error Log
        - consumer: nhận thông tin log từ Bank

    Testing
        - npm start tất cả các service
        - Call req từ IoT và Software
        - Thông tin sẽ được ghi vào thư mục logs
        - Có thể theo dõi qua 5 cmd của 5 service quá trình gửi/nhận dữ liệu
```