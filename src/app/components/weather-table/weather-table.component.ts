import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Unit } from '../../services/unit';

@Component({
    selector: 'app-weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss'],
    imports: [CommonModule]
})
export class WeatherTableComponent implements OnInit {
    @Input() tableData: Array<{
        date: string;
        max_temp: number;
        min_temp: number;
        rain_pct: number;
        wind_dir: string;
        wind_speed: number;
        air_quality: string;
    }> = [];
    selectedUnit!: string;

    constructor(private uniService: Unit) { }

    ngOnInit(): void {
        this.uniService.getUnit().subscribe(unit => {
            this.selectedUnit = unit;
        });
    }
}
