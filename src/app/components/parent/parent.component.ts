import { Component, OnDestroy, signal } from '@angular/core';
import { ChildOneComponent } from '../child-one/child-one.component';
import { ChildTwoComponent } from '../child-two/child-two.component';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-parent',
  imports: [ChildOneComponent, ChildTwoComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent implements OnDestroy {
  // Message to child
  parentMessageToChildOne = signal('Hello Child-One! Im your Parent!');

  // Forward message from child to child
  messageFromChildTwo = signal('???');

  forwardToChildOne(message: string) {
    this.messageFromChildTwo.set(message);
  }

  // Message from child
  messageFromChildOne = signal('???');

  setMessageFromChildOne(message: string) {
    this.messageFromChildOne.set(message);
  }

  // Message for subscriber
  private eventSubscription: Subscription;

  constructor(private eventService: EventService) {
    this.eventSubscription = this.eventService.subscribe('PING', () => this.showPing());
  }

  showPing() {
    console.log('PING!');
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
