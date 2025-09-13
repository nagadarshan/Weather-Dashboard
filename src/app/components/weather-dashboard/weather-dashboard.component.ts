import { Component, OnInit } from '@angular/core';
import { DateRangeFilterComponent } from '../date-range-filter/date-range-filter.component';
import { HeaderComponent } from '../header/header.component';
import { WeatherDayCardComponent } from '../weather-day-card/weather-day-card.component';
import { UnitToggleComponent } from '../unit-toggle/unit-toggle.component';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';
import { Weather } from '../../services/weather';
import { WeatherTableComponent } from '../weather-table/weather-table.component';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
  imports: [DateRangeFilterComponent, HeaderComponent, WeatherDayCardComponent, UnitToggleComponent, WeatherDetailsComponent, WeatherTableComponent]
})
export class WeatherDashboardComponent implements OnInit {
  cities = [];
  favourites = [];
  startDate = new Date();
  endDate = new Date();
  weatherDetails: any = [];
  selectedCity: string = '';
  selectedDateDetail: any;
  weatherApiDetails: any;
  selectedForcast = 'nextWeek';
  weatherTableData = []

  constructor(private weatherService: Weather) {
    this.startDate.setDate(new Date().getDate() - 14);
    this.endDate.setDate(new Date().getDate() + 14);
  }

  ngOnInit() {
    this.weatherService.getWeather('http://localhost:9000/cities.json').subscribe(data => {
      this.cities = data.map((city: any) => city.name);
      // Pick 3 random unique cities for favourites and remove them from cities
      const shuffled = [...this.cities].sort(() => 0.5 - Math.random());
      this.favourites = shuffled.slice(0, 3);
      this.cities = this.cities.filter(city => !this.favourites.includes(city));
      this.selectedCity = this.favourites[0] || '';
      this.getWeatherDetails();
    });
  }
  onCityChange(city: string) {
    this.selectedCity = city;
    this.getWeatherDetails();
    // Fetch and update weather details for the selected city
  }

  getWeatherDetails() {
    const cityFile = this.selectedCity.replace(/\s+/g, '_');
    this.weatherService.getWeather(`http://localhost:9000/city/${cityFile}.json`).subscribe(data => {
      this.generateWeatherDetails(data);
      // Process and update weatherDetails based on fetched data
    });
  }
  generateWeatherDetails(data: any) {
    console.log(data);
    this.weatherApiDetails = data;
    this.populateWeatherDetails();
    this.populateWeatherDetailsTable();
    this.onSelectedDate({ date: new Date() }); // Select today's date by default
  }

  onSelectedDate(event: any) {
    this.selectedDateDetail = this.weatherApiDetails.find((detail: any) => {
      const d1 = new Date(detail.date);
      const d2 = event.date instanceof Date ? event.date : new Date(event.date);
      return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    });
  }
  onRangeChange(range: any) {
    console.log(range);
    this.selectedForcast = range.selectedForcast;
    this.populateWeatherDetailsTable(range);
  }

  populateWeatherDetails() {
    const today = new Date();
    const start = new Date();
    const end = new Date();
    start.setDate(today.getDate());
    end.setDate(today.getDate() + 6);
    this.weatherDetails = this.weatherApiDetails
      .filter((day: any) => {
        const d = new Date(day.date);
        const isInRange =
          (d.getMonth() > start.getMonth() || (d.getMonth() === start.getMonth() && d.getDate() >= start.getDate())) &&
          (d.getMonth() < end.getMonth() || (d.getMonth() === end.getMonth() && d.getDate() <= end.getDate()));
        return isInRange;
      })
      .map((day: any) => ({
        date: new Date(day.date),
        temp: day.max_temp
      }));
  }

  populateWeatherDetailsTable(range?: any) {
    // Only include next week's data (from tomorrow to 7 days ahead)
    const today = new Date();
    const start = new Date();
    const end = new Date();
    switch (this.selectedForcast) {
      case 'pastWeek':
        start.setDate(today.getDate() - 6);
        end.setDate(today.getDate());
        break;
      case 'nextWeek':
        start.setDate(today.getDate());
        end.setDate(today.getDate() + 6);
        break;
      case 'fullMonth':
        start.setDate(today.getDate() - 14);
        end.setDate(today.getDate() + 14);
        break;
      case 'next14Days':
        start.setDate(today.getDate());
        end.setDate(today.getDate() + 14);
        break;
      case 'custom':
        if (range.start && range.end) {
          start.setTime(range.start.getTime());
          end.setTime(range.end.getTime());
        } else {
          start.setDate(today.getDate() - 14);
          end.setDate(today.getDate() + 14);
        }
    }
    console.log('Filtering weather details from', start, 'to', end);
    this.weatherTableData = this.weatherApiDetails
      .filter((day: any) => {
        const d = new Date(day.date);
        const isInRange =
          (d.getMonth() > start.getMonth() || (d.getMonth() === start.getMonth() && d.getDate() >= start.getDate())) &&
          (d.getMonth() < end.getMonth() || (d.getMonth() === end.getMonth() && d.getDate() <= end.getDate()));
        return isInRange;
      });
  }
}
