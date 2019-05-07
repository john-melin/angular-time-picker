import { DecimalPipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

import { TimeUnitWheelComponent } from './time-unit-wheel/time-unit-wheel.component';
import { TimeUnit, Time } from '../models';

@Component({
  selector: 'app-time-picker-overlay',
  templateUrl: './time-picker-overlay.component.html',
  styleUrls: ['./time-picker-overlay.component.scss'],
})
export class TimePickerOverlayComponent {
  readonly TimeUnit = TimeUnit;

  @Input() model: Time;

  @ViewChild('hourWheel') hourWheel: TimeUnitWheelComponent;
  @ViewChild('minuteWheel') minuteWheel: TimeUnitWheelComponent;

  hours: string[];
  minutes: string[];

  constructor(private numberPipe: DecimalPipe) {
    this.hours = this.getIntervalNumberStrings(24);
    this.minutes = this.getIntervalNumberStrings(60);
  }

  scrollDigitWheels() {
    this.hourWheel.scrollActiveOptionIntoView();
    this.minuteWheel.scrollActiveOptionIntoView();
  }

  private getIntervalNumberStrings(to: number): string[] {
    const space = ['', '', ''];
    const hours = Array.from(new Array(to), (_, index) =>
      this.numberPipe.transform(index, '2.0')
    );

    return space.concat(hours).concat(space);
  }
}
