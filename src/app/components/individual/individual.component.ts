import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-individual',
  imports: [],
  templateUrl: './individual.component.html',
  styleUrl: './individual.component.scss'
})
export class IndividualComponent implements OnDestroy {
  // Messaage from
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
