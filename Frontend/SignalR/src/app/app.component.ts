import { Component, OnDestroy } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private signalRSubscription: Subscription;

  public content: {val1: string, val2: string, val3: string, val4: string} =
                              {val1: '---', val2: '---', val3: '---', val4: '---'};

  constructor(private signalrService: SignalrService) {
    this.signalrService.connect();
    this.signalRSubscription = this.signalrService.getMessage().subscribe(
      (message) => {
        this.content.val1 = message.val1;
        this.content.val2 = message.val2;
        this.content.val3 = message.val3;
        this.content.val4 = message.val4;
    });
  }

  ngOnDestroy(): void {
    this.signalrService.disconnect();
    this.signalRSubscription.unsubscribe();
  }
}
