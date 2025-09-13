import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Unit {
  private selectedUnit: BehaviorSubject<string> = new BehaviorSubject<string>('C');
  
  setUnit(unit: string) {
    this.selectedUnit.next(unit);
  }

  getUnit() {
    return this.selectedUnit.asObservable();
  }
}
