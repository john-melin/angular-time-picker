import { Component, ViewChild, ElementRef, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';

import { Time } from './time/time';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent implements AfterViewInit {
  readonly mask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];

  @Input() max: string;
  @Input() min: string;

  @Input()
  set value(val: string) {
    this.model.updateTime(val);
  }
  get value(): string {
    return this.model.value;
  }

  @ViewChild('timePickerField') timePickerField: ElementRef;
  get timeInput(): HTMLInputElement {
    return this.timePickerField.nativeElement;
  }

  get shouldLabelFloat(): boolean {
    return this.isFocused || !this.isEmpty;
  }

  get isEmpty(): boolean {
    return this.timeInput.value === '';
  }

  isFocused = false;
  isOpen = false;
  model = new Time();

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  setTime(newTime: string) {
    this.model.updateTime(newTime);
  }

  toggleOverlay() {
    this.fillEmptyTime();
    this.isOpen = !this.isOpen;
  }

  fillEmptyTime() {
    if (!this.isEmpty) {
      this.model.fillEmptyTime();
    }
  }
}

