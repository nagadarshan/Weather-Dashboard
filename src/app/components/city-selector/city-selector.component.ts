import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-city-selector',
    templateUrl: './city-selector.component.html',
    styleUrls: ['./city-selector.component.scss'],
    imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatSelectModule]
})
export class CitySelectorComponent {
    @Input() cities: string[] = [];
    @Input() selectedCity: string = '';
    @Input() favourites: string[] = [];
    @Output() cityChange = new EventEmitter<string>();
    selectedDateRange: { start: Date | null, end: Date | null } = { start: null, end: null };

    onCityChange(event: any) {
        const value = event.value;
        console.log('City changed to:', value);
        this.cityChange.emit(value);
    }

    selectFavourite(city: string) {
        console.log('Selecting favourite city:', city);
        this.cityChange.emit(city);
    }

}
