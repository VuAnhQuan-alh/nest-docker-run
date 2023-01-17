import { WebSocketGateway } from '@nestjs/websockets';
import { NotificationService } from './notification.service';

@WebSocketGateway(1101, { namespace: 'notification' })
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}
}
