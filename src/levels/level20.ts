import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.X.___.X.',
    '...___...',
    '...___...',
    '...___...',
    '...___...',
    '...___...',
    '.........',
    '.........',
    '.........',
  ],
  overlay: [
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '000000000',
    '000000000',
    '000000000',
  ],
  challanges: {
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 63,
    weight_1: 2,
  },
  moves: 32,
}

export default level
