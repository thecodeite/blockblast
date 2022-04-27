import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '___XYZ___',
    '..00000..',
    '..00000..',
    '..00000..',
    '..00000..',
    '..00000..',
    '..00000..',
    '..00000..',
    '..00000..',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_1',
    Y: 'weight_2',
    Z: 'weight_3',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 40,
    weight_1: 1,
    weight_2: 1,
    weight_3: 1,
  },
  moves: 38,
}

export default level
