import { Component } from '@angular/core';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [WeatherDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ang-standalone';
}
