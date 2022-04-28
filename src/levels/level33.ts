import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '..XXX..',
    '..111..',
    '..111..',
    '..111..',
    '..111..',
    '..111..',
    '..111..',
    '..111..',
    '..XXX..',
  ],
  challanges: {
    X: 'cage_weight_1',
    1: 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 6,
    block_1: 21,
  },
  moves: 28,
}

export default level
