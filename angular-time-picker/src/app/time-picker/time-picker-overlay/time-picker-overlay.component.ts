import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Time } from '../time/time';
import { TimeUnit } from './time-unit';

@Component({
  selector: 'app-time-picker-overlay',
  templateUrl: './time-picker-overlay.component.html',
  styleUrls: ['./time-picker-overlay.component.scss'],
})
export class TimePickerOverlayComponent {
  readonly TimeUnit = TimeUnit;
  @Input() model: Time;

  hours: string[];
  minutes: string[];

  constructor(private numberPipe: DecimalPipe) {
    this.hours = this.getIntervalNumberStrings(24);
    this.minutes = this.getIntervalNumberStrings(60);
  }

  private getIntervalNumberStrings(to: number): string[] {
    const space = ['', '', ''];
    const hours = Array.from(new Array(to), (_, index) =>
      this.numberPipe.transform(index, '2.0')
    );

    return space.concat(hours).concat(space);
  }
}
