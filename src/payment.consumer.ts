import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentConsumer {
  @EventPattern('payment-topic')
  handlePayment(@Payload() message: any) {
    const data = JSON.parse(message.value.toString());
    console.log('📥 Payment Received from Kafka:', data);

    // DB me insert karna ya koi action lena
  }
}