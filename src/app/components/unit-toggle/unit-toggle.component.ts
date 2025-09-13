import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Unit } from '../../services/unit';

@Component({
  selector: 'app-unit-toggle',
  templateUrl: './unit-toggle.component.html',
  styleUrls: ['./unit-toggle.component.scss']
})
export class UnitToggleComponent {
  unit: 'C' | 'F' = 'C';

  constructor(private unitService: Unit) { }
  
  toggleUnit(unit: 'C' | 'F') {
    this.unit = unit;
    this.unitService.setUnit(unit);
  }
}
