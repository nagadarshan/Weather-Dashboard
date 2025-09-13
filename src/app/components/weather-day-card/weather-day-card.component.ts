import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Unit } from '../../services/unit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-day-card',
  templateUrl: './weather-day-card.component.html',
  styleUrls: ['./weather-day-card.component.scss'],
  imports: [CommonModule]
})
export class WeatherDayCardComponent implements OnChanges, OnInit {
  @Input() selectedDateDetail: any;
  selectedUnit: string = 'C';
  weatherCondition: string = 'sunny';

  constructor(private unitService: Unit) { }

  ngOnInit(): void {
    this.unitService.getUnit().subscribe(u => {
      this.selectedUnit = u;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedDateDetail?.rain_pct > 50) {
      this.weatherCondition = 'rainy';
    } else if(this.selectedDateDetail?.max_temp >= 22) {
      this.weatherCondition = 'sunny';
    } else if((this.selectedDateDetail?.max_temp + this.selectedDateDetail?.min_temp)/2 < 15) {
      this.weatherCondition = 'cold';
    }
  }
}
