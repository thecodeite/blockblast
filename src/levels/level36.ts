import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    'rby000ybr',
    'rby000ybr',
    'rby000ybr',
    '111   111',
    '111   111',
    '111   111',
    '   000   ',
    '   000   ',
    '   000   ',
  ],
  challanges: {
    '0': 'cage_beachball',
    '1': 'cage_block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 18,
    block: 18,
  },
  moves: 41,
}

export default level
