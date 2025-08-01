import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { PaymentConsumer } from './paymentConsumer/payment.consumer';
import { NotificationConsumer } from './notificationConsumer/notification.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(), // optional: if using .env configs
    ClientsModule.register([
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [AppController, PaymentConsumer, NotificationConsumer],
  providers: [AppService, ConfigService, KafkaService],
  exports: [ConfigService],
})
export class AppModule {}
