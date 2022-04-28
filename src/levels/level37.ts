import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '000X000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '.......',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 1,
    beachball: 55,
  },
  moves: 30,
}

export default level
