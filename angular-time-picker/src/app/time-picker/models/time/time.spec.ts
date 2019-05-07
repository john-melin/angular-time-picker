import { Time } from './time';

describe('Time model', () => {
  describe('new Time', () => {
    it('with not values passed should insantiate with empty value', () => {
      const time = new Time();
      expect(time.value).toBe('');
    });

    it('with passed hour value should insantiate with empty value', () => {
      const time = new Time('1');
      expect(time.value).toBe('');
    });

    it('with passed hour: 1 and minute: 2 value should insantiate with value: 01:02', () => {
      const time = new Time('1', '2');
      expect(time.value).toBe('01:02');
    });

    it('with passed hour: a and minute: b value should insantiate with value: 00:00', () => {
      const time = new Time('a', 'b');
      expect(time.value).toBe('00:00');
    });

    it('with passed hour: 900 and minute: 88 value should insantiate with value: 23:59', () => {
      const time = new Time('900', '88');
      expect(time.value).toBe('23:59');
    });
  });

  describe('fillEmptyTime', () => {
    it('should fill empty Time value with default value: 00:00', () => {
      const time = new Time();
      time.fillEmptyTime();
      expect(time.value).toBe('00:00');
    });
  });

  describe('updateHour', () => {
    let time: Time;
    beforeEach(() => {
      time = new Time('02', '05');
    });

    it('argument: 10 should change value: 02:05 to 10:05', () => {
      time.updateHour('10');
      expect(time.value).toBe('10:05');
    });

    it('invalid argument: a should not change value from 02:05 to a:05', () => {
      time.updateHour('a');
      expect(time.value).toBe('02:05');
    });

    it('invalid argument: -1 should not change value from 02:05 to -1:05', () => {
      time.updateHour('-1');
      expect(time.value).toBe('02:05');
    });

    it('argument: 900 above maximum hour value:23 should change value from 02:05 to 23:05', () => {
      time.updateHour('900');
      expect(time.value).toBe('23:05');
    });
  });

  describe('updateMinute', () => {
    let time: Time;
    beforeEach(() => {
      time = new Time('02', '05');
    });

    it('argument: 10 should change value: 02:05 to 02:10', () => {
      time.updateMinute('10');
      expect(time.value).toBe('02:10');
    });

    it('invalid argument: b should not change value from 02:05 to 02:b', () => {
      time.updateMinute('b');
      expect(time.value).toBe('02:05');
    });

    it('invalid argument: -10 should not change value from 02:05 to -1:05', () => {
      time.updateHour('-10');
      expect(time.value).toBe('02:05');
    });

    it('argument: 100 above maximum minute value:59 should change value from 02:05 to 02:59', () => {
      time.updateMinute('900');
      expect(time.value).toBe('02:59');
    });
  });

  describe('updateTime', () => {
    let time: Time;
    beforeEach(() => {
      time = new Time('02', '05');
    });

    it('argument 20:44 should change value to 20:44', () => {
      time.updateTime('20:44');
      expect(time.value).toBe('20:44');
    });

    it('empty argument "" should set value to ""', () => {
      time.updateTime('');
      expect(time.value).toBe('');
    });

    it('invalid argument 123asd should not change value', () => {
      time.updateTime('123asd');
      expect(time.value).toBe('02:05');
    });

    it('invalid argument 12:3a should not change value', () => {
      time.updateTime('12:3x');
      expect(time.value).toBe('02:05');
    });
  });
});
