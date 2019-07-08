import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  // private message$: Subject<any>;
  connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl(environment.hubAddress)
    .build();
    this.connect();
  }

  public connect() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection.start().catch(err => console.log(err));
    }
  }

  public getMessage(methodName: string, next) {
      this.connection.on(methodName, (message) => {
        next(message);
      });
  }

  public disconnect() {
    this.connection.stop();
  }
}
