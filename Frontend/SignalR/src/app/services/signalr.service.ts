import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private message$: Subject<any>;
  connection: signalR.HubConnection;

  constructor() {
    this.message$ = new Subject<any>();
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:2172/notificationHub')
    .build();
  }

  public connect() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection.start().catch(err => console.log(err));

      this.connection.on('SendMessage', (message) => {
        this.message$.next(message);
      });
    }
  }

  public getMessage(): Observable<any> {
    return this.message$.asObservable();
  }

  public disconnect() {
    this.connection.stop();
  }
}
