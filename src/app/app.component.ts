import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndividualComponent } from './components/individual/individual.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IndividualComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
