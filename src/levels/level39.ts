import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 7,
  initial: [
    '.......',
    '.......',
    '0000000',
    '0000000',
    '       ',
    '       ',
    '1111111',
    '1111111',
  ],
  challanges: {
    '0': 'cage_beachball',
    '1': 'cage_block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 14,
    block_1: 14,
  },
  moves: 34,
}

export default level
