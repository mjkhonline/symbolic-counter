import Dec from '@/utils/Dec'
import Decimal from 'decimal.js'
export function numberToArray(num: Dec): Array<number | string> {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('').map((v) => (v === ',' ? v : Number(v)))
}

export function secondsDiff(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / 1000
}

export function convertTimeToDate(inputTime: string): Date {
  const [hours, minutes] = inputTime.split(":").map(Number)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(0)
  return date
}

export function rnd(max: Dec, min: Dec = new Dec(0)): Dec {
  return max.minus(min).plus(1).times(Dec.random()).plus(min).floor()
}

export function shuffleArray(array: any[]): any[] {
  return array.sort(() => Dec.random().minus(0.5).toNumber())
}

export function generateNextSequence(capacity: Dec): Dec[] {
  const ZERO = new Dec(0)
  let rest = capacity
  const sequence = new Array(60).fill(ZERO)
  for (let i = 0; i < 44; i++) {
    const cellCapacity = rnd(Decimal.min(rest, capacity).toPower(new Dec(1).div(1.5)))
    sequence[i] = cellCapacity
    rest = rest.minus(cellCapacity)
  }
  sequence[45] = rest

  return shuffleArray(sequence) as Dec[]
}
