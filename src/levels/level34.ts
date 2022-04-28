import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '1X...X1',
    'X1...1X',
    '1X...X1',
    'X1...1X',
    '1X...X1',
    'X1...1X',
    '1X...X1',
    'X1...1X',
    '1X...X1',
  ],
  challanges: {
    X: 'cage_weight_1',
    1: 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 18,
    block_1: 18,
  },
  moves: 36,
}

export default level
