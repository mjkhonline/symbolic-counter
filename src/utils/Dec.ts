import Dec from 'decimal.js'

Dec.set({
  rounding: Dec.ROUND_DOWN,
  precision: 24,
  toExpNeg: -9e15,
  toExpPos: 9e15
})

export default Dec
