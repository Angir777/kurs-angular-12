import { Injectable } from '@angular/core';
import { filter, map, Subject, Subscription } from 'rxjs';

interface Event {
  type: string;
  payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private handler = new Subject<Event>();

  // We are sending the event
  broadcast(type: string, payload: any = {}) {
    this.handler.next({ type, payload });
  }

  // We subscribe to the event by type
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler
      .pipe(
        filter(event => event.type === type),
        map(event => event.payload)
      )
      .subscribe(callback);
  }
}
