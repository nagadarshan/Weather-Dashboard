import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShortMonthDayPipe } from '../../pipes/short-month-day.pipe';
import { Unit } from '../../services/unit';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  imports: [CommonModule, ShortMonthDayPipe]
})
export class WeatherDetailsComponent implements OnInit {
  @Input() weatherDetails: any;
  @Output() selectedDateDetail = new EventEmitter<any>();
  unit: string = 'C';
  constructor(private unitService: Unit) {

  }

  selectedDetail: any = null;

  isToday(date: Date | string): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }

  ngOnInit() {
    this.unitService.getUnit().subscribe(unit => {
      this.unit = unit;
    });
  }

  selectDetail(detail: any) {
    console.log(detail);
    this.selectedDetail = detail;
    this.selectedDateDetail.emit(detail);
  }

  isSelected(detail: any): boolean {
    // If a card is selected, only highlight the selected one. Otherwise, highlight the current date.
    if (this.selectedDetail) {
      return this.selectedDetail === detail;
    }
    return this.isToday(detail.date);
  }
}
