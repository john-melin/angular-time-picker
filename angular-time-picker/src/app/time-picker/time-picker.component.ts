import { Component, ViewChild, ElementRef, Input, ChangeDetectorRef, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Time } from './models';
import { WheelBlockComponent } from './wheel-block/wheel-block.component';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements AfterViewInit, OnDestroy {
  readonly mask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];
  readonly positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  @Input()
  set value(val: string) {
    this.model.updateTime(val);
  }
  get value(): string {
    return this.model.value;
  }

  @Output() timeSet = new EventEmitter<string>();

  @ViewChild(WheelBlockComponent) wheelBlock: WheelBlockComponent;
  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;

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
  valueSubscribtion: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.valueSubscribtion = this.model.valueChange.subscribe(newTime => this.timeSet.emit(newTime));
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.valueSubscribtion.unsubscribe();
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

  scrollDigitWheels() {
    this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      this.wheelBlock.scrollDigitWheels();
    });
  }

  close() {
    console.log('called close')
    this.isOpen = false;
  }
}

