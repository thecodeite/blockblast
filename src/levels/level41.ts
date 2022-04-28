import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__.....__',
    '_0000000_',
    '.0.....0.',
    '.0.___.0.',
    '.0.___.0.',
    '.0.___.0.',
    '.0.....0.',
    '_0000000_',
    '__.....__',
  ],
  overlay: [
    '.........',
    '.0000000.',
    '.0.....0.',
    '.0.....0.',
    '.0.....0.',
    '.0.....0.',
    '.0.....0.',
    '.0000000.',
    '.........',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 24,
    bubble: 24,
  },
  moves: 32,
}

export default level
