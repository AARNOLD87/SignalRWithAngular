import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { IMessage } from '../message';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent {

  totalString = '';
  constructor(private signalrService: SignalrService) {
    this.signalrService.getMessage(
      (message: IMessage) => {
        this.totalString = `${message.val1}${message.val2}${message.val3}${message.val4} ` ;
      }
    );
  }
  disconnect() {
    this.signalrService.disconnect();
  }
}
