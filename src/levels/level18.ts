import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '.........',
    '...___...',
    '...___...',
    '...___...',
    '.........',
    '.........',
    '.........',
  ],
  overlay: [
    '000000000',
    '000000000',
    '000000000',
    '000...000',
    '000...000',
    '000...000',
    '000000000',
    '000000000',
    '000000000',
  ],
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 72,
  },
  moves: 28,
}

export default level
