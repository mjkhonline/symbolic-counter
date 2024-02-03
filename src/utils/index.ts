export function numberToArray(num: number): number[] {
  return num.toString().split('').map(Number)
}

export function secondsDiff(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 1000
}

export function convertTimeToDate(inputTime: string): Date {
  const [hours, minutes] = inputTime.split(":").map(Number)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}
