import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0_0_0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 45,
  },
  moves: 33,
}

export default level
