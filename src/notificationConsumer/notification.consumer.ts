import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface INotificationConsumer{
    handleNotification(message: any): void;
    handleSomeOtherEvent(message: any): void;
}

@Controller()
export class NotificationConsumer  implements INotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  @EventPattern('notification-topic')
  handleNotification(@Payload() message: any) {
    try {
      console.log('Received notification message', message);
    } catch (err) {
      this.logger.error('Error in notification:', err);
      throw new InternalServerErrorException({
        message: 'Error processing payment message',
      });
    }
  }

  handleSomeOtherEvent(@Payload() message: any) {
    try {
      console.log('Received some other event message', message);
    } catch (err) {
      this.logger.error('Error in some other event:', err);
      throw new InternalServerErrorException({
        message: 'Error processing some other event',
      });
    }
  }
}
