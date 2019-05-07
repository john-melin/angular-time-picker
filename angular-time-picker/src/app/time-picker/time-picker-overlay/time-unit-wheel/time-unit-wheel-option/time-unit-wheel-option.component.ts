import { Component, OnInit, Input } from '@angular/core';
import { ListKeyManagerOption, Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-time-unit-wheel-option',
  templateUrl: './time-unit-wheel-option.component.html',
  styleUrls: ['./time-unit-wheel-option.component.scss']
})
export class TimeUnitWheelOptionComponent implements OnInit, ListKeyManagerOption, Highlightable {
  @Input() label: string;
  @Input() disabled = false;

  isActive = false;

  ngOnInit() {
    if (this.label === '') {
      this.disabled = true;
    }
  }

  getLabel?(): string {
    return this.label;
  }

  setActiveStyles() {
    this.isActive = true;
  }

  setInactiveStyles() {
    this.isActive = false;
  }
}
