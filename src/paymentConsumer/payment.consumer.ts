import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaService } from 'src/kafka/kafka.service';

@Controller()
export class PaymentConsumer {
  private readonly logger = new Logger(PaymentConsumer.name);

  constructor(private readonly kafkaService: KafkaService) {}

  @EventPattern('payment-consumer')
  handlePayment(@Payload() message: any) {
    try {
      console.log('Payment consumer message', message);

     //How payment is success, send the notification to user
      this.kafkaService.sendMessage('notification-topic', {
        message: 'Payment processed successfully',
        data: message,
      });

    } catch (err) {
      this.logger.error('Error processing payment message:', err);
      throw new InternalServerErrorException({
        message: 'Error processing payment message',
      });
    }
  }
}
