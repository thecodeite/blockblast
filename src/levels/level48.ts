import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '..1111111',
    '..1iiiiii',
    '..1i11111',
    '..1i1iiii',
    '..1i1i111',
    '..1i1i1ii',
    '..1i1i1i1',
  ],
  challanges: {
    '1': 'block_1',
    i: 'ice',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    ice: 21,
    block_1: 28,
  },
  moves: 35,
}

export default level
