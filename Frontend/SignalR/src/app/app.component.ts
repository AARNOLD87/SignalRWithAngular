import { Component, OnDestroy } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { Subscription } from 'rxjs';
import { IMessage } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  public content: IMessage;
  constructor(private signalrService: SignalrService) {
    this.signalrService.getMessage(
      (message: IMessage) => {
        this.content = message;
      }
    );
  }

  ngOnDestroy(): void {
    this.signalrService.disconnect();
   // this.signalRSubscription.unsubscribe();
  }
}
