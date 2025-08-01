import { Controller, Post, Body } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('send-payment')
  async sendPayment(@Body() body: any) {
    await this.kafkaService.sendMessage('payment-consumer', body);
    return { status: 'Payment event sent to Kafka' };
  }
}