import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 7,
  width: 7,
  initial: [
    '1.....1',
    '01...10',
    '001.100',
    '0001000',
    '0010100',
    '0100010',
    '1000001',
  ],

  challanges: {
    '0': 'beachball',
    '1': 'cage_block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 27,
    block_1: 13,
  },
  moves: 36,
}

export default level
