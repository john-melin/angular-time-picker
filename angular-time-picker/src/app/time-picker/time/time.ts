import { isNumber, toInteger } from '../utils/utils';

export class Time {
  private hour = '';
  private minute = '';

  get value(): string {
    return this.hour && this.minute
      ? `${this.hour}:${this.minute}`
      : '';
  }

  constructor(hour?: string, minute?: string) {
    if (hour && minute) {
      hour = this.getTimeUnitValue(hour, 23, true);
      minute = this.getTimeUnitValue(minute, 59, true);
      this.updateTime(`${hour}:${minute}`);
    }
  }

  getHour(): string { return this.hour; }

  getMinute(): string { return this.minute; }

  fillEmptyTime() {
    this.hour = this.getTimeUnitValue(this.hour, 23, true);
    this.minute = this.getTimeUnitValue(this.minute, 59, true);
  }

  updateHour(newHour: string) {
    if (this.isValidInteger(newHour)) {
      this.updateTime(`${newHour}:${this.minute}`);
    }
  }

  updateMinute(newMinute: string) {
    if (this.isValidInteger(newMinute)) {
      this.updateTime(`${this.hour}:${newMinute}`);
    }
  }

  updateTime(newTime: string) {
    if (this.isValidTime(newTime)) {
      const timeParts = newTime.split(':');
      this.hour = this.getTimeUnitValue(timeParts[0], 23);
      this.minute = this.getTimeUnitValue(timeParts[1], 59);
    } else if (newTime === '') {
      this.hour = '';
      this.minute = '';
    }
  }

  /* Returns the time unit value as a double digit if below
   * provided maxValue
   * else returns max value for said time unit
   * Ex value: 1
   * returns '01'
   *
   * If maxValue: 30 and value: 31, then 30 will be returned.
  */
  private getTimeUnitValue(value: string, maxValue: number, forceDoubleDigit = false): string {
    const unitTime = forceDoubleDigit ? this.parseToDoubleDigit(value) : value;

    return (toInteger(unitTime) > maxValue) ? `${maxValue}` : unitTime;
  }

  /* Prefixes value with a zero if single digit . */
  private parseToDoubleDigit(value: string): string {
    value = value.length > 1
      ? value
      : `0${value}`;

    return `${toInteger(value[0])}${toInteger(value[1])}`;
  }

  private isValidTime(value: string): boolean {
    const timeParts = value.split(':');
    const hasDivider = timeParts.length === 2;
    const hourIsValid = this.isValidInteger(timeParts[0]);
    const minuteIsValid = this.isValidInteger(timeParts[1]);
    return value && hasDivider && hourIsValid && minuteIsValid;
  }

  private isValidInteger(value: string): boolean {
    return isNumber(value) && toInteger(value) >= 0;
  }
}

/* To check wether to stop
  stepMinute(step = 1) {
    const minute = isNaN(this.minute) ? 0 : this.minute;
    this.updateMinute(minute + step);
  }

  minute % 60 < 0
    ? 60 + (minute % 60)
    : minute % 60;
*/
