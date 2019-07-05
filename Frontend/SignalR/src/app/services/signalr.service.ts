import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private message$: Subject<any>;
  connection: signalR.HubConnection;

  constructor() {
    this.message$ = new Subject<any>();
  }


  public connect(success: (message) => void): Subscription {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:2172/notificationHub')
    .build();

    this.connection.start().catch(err => console.log(err));

    this.connection.on('SendMessage', (message) => {
      this.message$.next(message);
    });

    return this.message$.subscribe(success);
  }

  public disconnect() {
    this.connection.stop();
  }
}
