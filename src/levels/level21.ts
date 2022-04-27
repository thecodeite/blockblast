import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '000000000',
    '0.......0',
    '0.00000.0',
    '0.00000.0',
    '0.00X00.0',
    '0.00000.0',
    '0.00000.0',
    '0.......0',

    '000000000',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 56,
    weight_1: 1,
  },
  moves: 27,
}

export default level
