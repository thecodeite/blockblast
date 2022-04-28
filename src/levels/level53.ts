import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 7,
  width: 9,
  initial: [
    '.........',
    '1111.1111',
    '1111.1111',
    '1XX1.1YY1',
    '1111.1111',
    '1111.1111',
    '.........',
  ],
  challanges: {
    '1': 'cage_block_1',
    X: 'weight_1',
    Y: 'weight_2',
  },
  colours: ['blue', 'yellow', 'red'],

  win: {
    block_1: 36,
    weight_1: 2,
    weight_2: 2,
  },
  moves: 33,
}

export default level
