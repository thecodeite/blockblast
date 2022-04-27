import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__.....__',
    '_......._',
    '.........',
    '.........',
    '...._....',
    '.........',
    '.........',
    '_......._',
    '__.....__',
  ],
  overlay: [
    '....0....',
    '...000...',
    '..00000..',
    '.0000000.',
    '0000.0000',
    '.0000000.',
    '..00000..',
    '...000...',
    '....0....',
  ],
  colours: ['blue', 'yellow', 'red', 'green', 'purple'],

  win: {
    bubble: 30,
  },
  moves: 30,
}

export default level
