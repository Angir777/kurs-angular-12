import { Component, EventEmitter, OnDestroy, Output, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-child-two',
  imports: [],
  templateUrl: './child-two.component.html',
  styleUrl: './child-two.component.scss'
})
export class ChildTwoComponent implements OnDestroy {
  // Message to sibling
  @Output() messageToSibling = new EventEmitter<string>();

  sendMessageToSibling() {
    this.messageToSibling.emit("Hello from Child-Two!");
  }

  // Message for subscriber
  message = signal('???');
  
  private eventSubscription: Subscription;

  constructor(private eventService: EventService) {
    this.eventSubscription = this.eventService.subscribe('MESSAGE_SENT', (payload) => {
      this.message.set(payload.text);
    });
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
