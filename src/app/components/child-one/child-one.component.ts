import { Component, EventEmitter, inject, Input, Output, WritableSignal } from '@angular/core';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-child-one',
  imports: [],
  templateUrl: './child-one.component.html',
  styleUrl: './child-one.component.scss'
})
export class ChildOneComponent {
  // Message from parent
  @Input() parentMessage!: WritableSignal<string>;
  
  // Message from sibling
  @Input() messageFromSibling!: WritableSignal<string>;

  // Message to parent
  @Output() messageToParent = new EventEmitter<string>();

  sendMessageToParent() {
    this.messageToParent.emit("Hello from Child-One!");
  }

  // Message to subscribers
  readonly eventService = inject(EventService);

  sendMessageToSubscribers() {
    this.eventService.broadcast('MESSAGE_SENT', { text: 'Hello! Here is a message from Child-One!' });
    this.eventService.broadcast('PING');
  }
}
