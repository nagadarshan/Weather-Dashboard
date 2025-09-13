import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortMonthDay' })
export class ShortMonthDayPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return '';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}
