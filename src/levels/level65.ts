import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__.....__',
    '__.....__',
    'XX.....XX',
    '000000000',
    '000000000',
    '000000000',
    '__.....__',
    '__.....__',
    '__.....__',
  ],

  challanges: {
    0: 'cage_beachball',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 27,
    weight_1: 4,
  },
  moves: 50,
}

export default level
