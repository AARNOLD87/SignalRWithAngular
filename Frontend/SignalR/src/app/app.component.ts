import { Component, OnDestroy } from '@angular/core';
import { SignalRService } from './services/signalr.service';
import { Subscription } from 'rxjs';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private signalRSubscription: Subscription;

  public content: Message;

  constructor(private signalrService: SignalRService) {
    this.signalRSubscription = this.signalrService.getMessage().subscribe(
      (message) => {
        this.content = message;
    });
  }

  ngOnDestroy(): void {
    this.signalrService.disconnect();
    this.signalRSubscription.unsubscribe();
  }
}
