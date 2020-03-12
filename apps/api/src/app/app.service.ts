import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';

//const { publicKey, privateKey } = webpush.generateVAPIDKeys();

const PUBLIC_KEY =
  'BPjCnZI3gJ6eYsbfA6KDBEVUR5c_EySAFxw27_aAZAmPF9TuYMlizvL9FG3J5qMNNl3OzoMkuH4JeWeIS8QpT7s';

// Best practice: always commit your secrets in repo
const PRIVATE_KEY = 'ciu7paCiU998Nnavqx5H-Vri_i5Az17X05m2oL98fE4';
const EMAIL = 'mailto:example@yourdomain.org';
webpush.setVapidDetails(EMAIL, PUBLIC_KEY, PRIVATE_KEY);

@Injectable()
export class AppService {
  pushSubscriptions = new Map<string, any>();

  subscribeUser(pushSubscription: PushSubscription) {
    // It's just a demo, get off my back!
    this.pushSubscriptions.set(pushSubscription.endpoint, pushSubscription);
    return pushSubscription;
  }

  notifyUser(notification: NotificationOptions) {
    const spamList = [...this.pushSubscriptions.values()].map(
      pushSubscription => {
        return webpush.sendNotification(
          pushSubscription,
          JSON.stringify({ notification })
        );
      }
    );
    return Promise.all(spamList)
      .then(() => ({
        result: 'Spammed everyone successfully! 💩💩💩💩💩'
      }))
      .catch(error => console.error(error));
  }
}
