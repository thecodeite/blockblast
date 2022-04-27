import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '...000...',
    '...000...',
    '...000...',
    '...000...',
  ],
  overlay: [
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '...000...',
    '...000...',
    '...000...',
    '...000...',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 36,
    beachball: 36,
  },
  moves: 31,
}

export default level
