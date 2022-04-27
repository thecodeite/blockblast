import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '000000000',
    '000000000',
    '000000000',
    '000000000',
    '0000.0000',
    '000...000',
    '00.....00',
    '0.......0',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 56,
  },
  moves: 34,
}

export default level
