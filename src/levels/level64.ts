import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    'BGGGGGGGG',
    'B   X   R',
    'B   1   R',
    'B  111  R',
    'B 11111 R',
    'B1111111R',
    'YYYYYYYYR',
  ],

  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
    G: 'cblock_green',
    '1': 'block',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    cblock: 28,
    block: 16,
    weight_1: 1,
  },
  moves: 38,
}

export default level
