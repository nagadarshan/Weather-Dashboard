import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss'],
  imports: [MatChipsModule, CommonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule]
})
export class DateRangeFilterComponent {
  minDate: any;
  maxDate: any;
  today: Date = new Date();
  @Input() selectedForcast: string = '';
  selectedRange!: { start: Date; end: Date };
  @Output() rangeChange = new EventEmitter<{ start: Date; end: Date, selectedForcast: string }>();

  showPicker = false;
  tempRange: { start: Date | undefined, end: Date | undefined } = { start: undefined, end: undefined };

  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setDate(new Date().getDate() - 14);
    this.maxDate = new Date();
    this.maxDate.setDate(new Date().getDate() + 14);
    this.tempRange = { ...this.selectedRange };
  }

  getDateString(date?: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  applyRange() {
    this.selectedForcast = 'custom';
    if (this.tempRange.start && this.tempRange.end) {
      this.rangeChange.emit({ start: this.tempRange.start, end: this.tempRange.end, selectedForcast: 'custom' });
      this.showPicker = false;
    }
  }

  onStartDateChange(event: any) {
    const value = event.target.value;
    this.tempRange.start = value ? new Date(value) : undefined;
  }

  onEndDateChange(event: any) {
    const value = event.target.value;
    this.tempRange.end = value ? new Date(value) : undefined;
  }

  onPastWeekClick() {
    this.selectedForcast = 'pastWeek';
    const start = new Date();
    start.setDate(this.today.getDate() - 6); // 7 days including today
    this.rangeChange.emit({ start, end: this.today, selectedForcast: 'pastWeek' });
  }
  onNextWeekClick() {
    this.selectedForcast = 'nextWeek';
    const end = new Date();
    end.setDate(this.today.getDate() + 6); // 7 days including today
    this.rangeChange.emit({ start: this.today, end, selectedForcast: 'nextWeek' });
  }
  onFullMonthClick() {
    this.selectedForcast = 'fullMonth';
    this.rangeChange.emit({ start: this.minDate, end: this.maxDate, selectedForcast: 'fullMonth' });
  }
  onNext14DayClick() {
    this.selectedForcast = 'next14Days';
    const end = new Date();
    end.setDate(this.today.getDate() + 13); // 14 days including today
    this.rangeChange.emit({ start: this.today, end, selectedForcast: 'next14Days' });
  }
}
