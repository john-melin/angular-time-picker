import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';

import { TimeUnit } from '../time-unit';
import { Time } from '../../time/time';
import { toInteger } from '../../utils/utils';
import { TimeUnitWheelOptionComponent } from './time-unit-wheel-option/time-unit-wheel-option.component';

@Component({
  selector: 'app-time-unit-wheel',
  templateUrl: './time-unit-wheel.component.html',
  styleUrls: ['./time-unit-wheel.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeUnitWheelComponent implements AfterContentInit, AfterViewInit {
  readonly StartOffsetIndex = 3;
  readonly itemHeight = 40;

  @Input() timeUnitType: TimeUnit;
  @Input() model: Time;
  @Input() digits: string[];

  @ViewChild('digitList') digitList: ElementRef;
  @ViewChildren(TimeUnitWheelOptionComponent) digitListItems: QueryList<TimeUnitWheelOptionComponent>;

  listPositionOffset = 0;
  keyManager: ActiveDescendantKeyManager<TimeUnitWheelOptionComponent>;

  constructor() { }

  ngAfterContentInit() {
    console.log(this.digitList.nativeElement.scrollTop)

    setTimeout(() => {
      this.digitList.nativeElement.scrollTop = 300;
      console.log(this.digitList.nativeElement.scrollTop)
      console.log(this.digitList)
    }, 40);
  }

  ngAfterViewInit(): void {
    // const index = this.getIndexFromScrollTopOffset(300);


   // this.changeDetector.detectChanges();
    /*
    this.initKeyManager();
    this.setInitSelectedItem();
    this.scrollActiveOptionIntoView();
*/
   // this.changeDetector.detectChanges();
  }

  onScroll(scrollOffset: number) {
    const index = this.getIndexFromScrollTopOffset(scrollOffset);
    //this.keyManager.setActiveItem(index);
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<TimeUnitWheelOptionComponent>(this.digitListItems)
      .skipPredicate(item => item.disabled);

    this.keyManager.change.subscribe(() => this.updateTimeModel());
  }

  private updateTimeModel() {
    if (this.keyManager.activeItem) {
      const activeDigit = this.keyManager.activeItem.label;
      this.timeUnitType === TimeUnit.HOUR
        ? this.model.updateHour(activeDigit)
        : this.model.updateMinute(activeDigit);

      this.scrollActiveOptionIntoView();
    }
  }

  private setInitSelectedItem() {
    const value = this.timeUnitType === TimeUnit.HOUR
      ? this.model.getHour()
      : this.model.getMinute();
    this.setSelecedItemByValue(value);
  }

  private setSelecedItemByValue(digitValue: string) {
    const index = this.getListIndexFromValue(digitValue);
    this.keyManager.setActiveItem(index);
  }

  // Cant get this to work on initiation
  private scrollActiveOptionIntoView() {
    const selectedIndex = this.keyManager.activeItemIndex || 0;
    this.listPositionOffset = this.getScrollTopOffsetFromIndex(selectedIndex);

   // this.changeDetector.detectChanges();
  }

  private getListIndexFromValue(timeValue: string): number {
    return this.StartOffsetIndex + toInteger(timeValue);
  }

  private getScrollTopOffsetFromIndex(index: number): number {
    return this.itemHeight * (index - this.StartOffsetIndex);
  }

  private getIndexFromScrollTopOffset(offset: number): number {
    const index = (offset / this.itemHeight) + this.StartOffsetIndex;
    const indexDecimalPortion = index % 1;

    const prevIndex = Math.floor(index);
    const nextIndex = Math.round(index);

    const snapUpperThreshold = 0.90;
    const snapLowerThreshold = 0.10;

    if (indexDecimalPortion > snapUpperThreshold) {
      return nextIndex;
    } else if (indexDecimalPortion < snapLowerThreshold) {
      return prevIndex;
    } else {
      return index;
    }
  }
}
