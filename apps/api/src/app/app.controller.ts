import { Body, Controller, Get, Post } from '@nestjs/common';


import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('subscribe')
  subscribeUser(@Body() pushSubscription: PushSubscription) {
    return this.appService.subscribeUser(pushSubscription);
  }

  @Post('notify')
  notifyUser(@Body('notification') notification: NotificationOptions) {
    return this.appService.notifyUser(notification);
  }
}
