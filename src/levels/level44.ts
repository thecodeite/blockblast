import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '111...111',
    '1X1...1X1',
    '111...111',
    '   111   ',
    '   1X1   ',
    '   111   ',
    '111   111',
    '1X1   1X1',
    '111   111',
  ],
  challanges: {
    '1': 'block_1',
    X: 'cage_weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 40,
    weight_1: 5,
  },
  moves: 36,
}

export default level
