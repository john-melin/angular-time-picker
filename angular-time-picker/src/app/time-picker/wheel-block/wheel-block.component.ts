import { DecimalPipe } from '@angular/common';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { TimeUnit, Time } from '../models';
import { TimeWheelComponent } from './time-wheel/time-wheel.component';

@Component({
  selector: 'app-wheel-block',
  templateUrl: './wheel-block.component.html',
  styleUrls: ['./wheel-block.component.scss'],
})
export class WheelBlockComponent {
  readonly TimeUnit = TimeUnit;

  @Input() model: Time;

  @Output() enter = new EventEmitter();

  @ViewChild('hourWheel') hourWheel: TimeWheelComponent;
  @ViewChild('minuteWheel') minuteWheel: TimeWheelComponent;

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
