import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { defer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

const serverPublicKey =
  'BPjCnZI3gJ6eYsbfA6KDBEVUR5c_EySAFxw27_aAZAmPF9TuYMlizvL9FG3J5qMNNl3OzoMkuH4JeWeIS8QpT7s';
@Component({
  selector: 'ng-leipzig-root',
  template: `
    {{ subscription$ | async | json }}
  `
})
export class AppComponent {
  subscription$;
  constructor(private http: HttpClient, private swPush: SwPush) {
    this.subscription$ = defer(() =>
      this.swPush.requestSubscription({ serverPublicKey })
    ).pipe(
      flatMap(subscription => this.http.post('/api/subscribe', subscription))
    );
    this.swPush.messages.subscribe(console.log);
    this.swPush.notificationClicks.subscribe(console.log);
  }
}
