import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '.......',
    '.......',
    '1111111',
    '1111111',
    '1111111',
    '.......',
    '1111111',
    '1111111',
    '1111111',
  ],
  challanges: {
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 42,
  },
  moves: 35,
}

export default level
