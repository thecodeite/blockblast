import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
    '.0.0.0.',
  ],
  challanges: {
    '0': 'cage_beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 27,
  },
  moves: 32,
}

export default level
