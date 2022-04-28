import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0........',
    '0.0000000',
    '0.0.....0',
    '0.0.000.0',
    '0.0.0.0.0',
    '0.0...0.0',
    '0.00000.0',
    '0.......0',
    '000000000',
  ],
  challanges: {
    '0': 'cage_beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 45,
  },
  moves: 38,
}

export default level
