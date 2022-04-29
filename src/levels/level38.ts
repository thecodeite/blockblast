import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '___...___',
    '__.....__',
    '_11...11_',
    'X111.111X',
    '111111111',
    '111111111',
    '_1111111_',
    '__11111__',
    '___111___',
  ],
  overlay: [
    '.........',
    '.........',
    '.00...00.',
    '.000.000.',
    '000000000',
    '000000000',
    '.0000000.',
    '..00000..',
    '...000...',
  ],
  challanges: {
    '1': 'block',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 2,
    bubble: 43,
    block: 43,
  },
  moves: 37,
}

export default level
