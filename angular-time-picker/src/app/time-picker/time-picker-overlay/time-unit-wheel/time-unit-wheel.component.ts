import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { toInteger } from '../../utils/utils';
import { TimeUnitWheelOptionComponent } from './time-unit-wheel-option/time-unit-wheel-option.component';
import { TimeUnit, ARROW_UP, Time, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from '../../models';

@Component({
  selector: 'app-time-unit-wheel',
  templateUrl: './time-unit-wheel.component.html',
  styleUrls: ['./time-unit-wheel.component.scss'],
})
export class TimeUnitWheelComponent implements AfterViewInit {
  readonly StartOffsetIndex = 3;
  readonly itemHeight = 40;

  @Input() timeUnitType: TimeUnit;
  @Input() model: Time;
  @Input() digits: string[];

  @ViewChild('digitList') digitList: ElementRef;
  @ViewChildren(TimeUnitWheelOptionComponent) digitListItems: QueryList<TimeUnitWheelOptionComponent>;

  listPositionOffset = 0;
  keyManager: ActiveDescendantKeyManager<TimeUnitWheelOptionComponent>;

  ngAfterViewInit() {
    this.initKeyManager();
    this.setInitSelectedItem();
    this.scrollActiveOptionIntoView();
  }

  onScroll(scrollOffset: number) {
    const index = this.getIndexFromScrollTopOffset(scrollOffset);
    this.keyManager.setActiveItem(index);
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === ARROW_UP || keyEvent.key === ARROW_DOWN) {
      this.keyManager.onKeydown(keyEvent);
    } else if (keyEvent.key === ARROW_LEFT || keyEvent.key === ARROW_RIGHT) {
      this.focusOnSibling();
    }
  }

  scrollActiveOptionIntoView() {
    const selectedIndex = this.keyManager.activeItemIndex || 0;
    this.listPositionOffset = this.getScrollTopOffsetFromIndex(selectedIndex);
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<TimeUnitWheelOptionComponent>(this.digitListItems)
      .skipPredicate(item => item.disabled)
      .withAllowedModifierKeys(['shiftKey']);

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
    const index = this.getIndexFromValue(digitValue);
    this.keyManager.setActiveItem(index);
  }

  private getIndexFromValue(timeValue: string): number {
    return this.StartOffsetIndex + toInteger(timeValue);
  }

  private getScrollTopOffsetFromIndex(index: number): number {
    return this.itemHeight * (index - this.StartOffsetIndex);
  }

  /* Returns an index if the offset is within the snap threshold
   *
   * The snap threshold adds a small jumpy snap to the
   * wheel in addition to css snap.
   * It also updates the time model as the wheel scrolls
   * past the digits. Without this the wheel will just
   * updating when the wheel stops. This looks
   * neat if the time picker input field is visible
   * while the overlay with the wheels is open.
   */
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

  private focusOnSibling() {
    const sibling = this.timeUnitType === TimeUnit.HOUR
      ? TimeUnit.MINUTE
      : TimeUnit.HOUR;
    (document.querySelector(`.${sibling}`) as HTMLElement).focus();
  }
}
