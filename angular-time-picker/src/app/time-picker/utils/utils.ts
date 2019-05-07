export function toInteger(value: any): number {
  const integer = Number(`${value}`);
  return !isNaN(integer) ? integer : 0;
}

export function isNumber(value: any): value is number {
  return !isNaN(Number(`${value}`));
}
