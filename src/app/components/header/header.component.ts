import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatChipsModule, MatFormFieldModule, MatSelectModule, CommonModule]
})
export class HeaderComponent {
  @Input() cities: string[] = [];
  @Input() selectedCity: string = '';
  @Input() favourites: string[] = [];
  @Output() cityChange = new EventEmitter<string>();
  dropdownOpen = false;

  selectFavourite(city: string) {
    console.log('Selecting favourite city:', city);
    this.selectedCity = city;
    this.cityChange.emit(city);
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.cityChange.emit(city);
    this.dropdownOpen = false;
  }
}
