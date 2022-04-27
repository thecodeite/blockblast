import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    'X00..00Y',
    '000..000',
    '000..000',
    '000..000',
    '000..000',
    '000..000',
    '000..000',
    '000..000',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_2',
    Y: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 46,
    weight_1: 1,
    weight_2: 1,
  },
  moves: 36,
}

export default level
