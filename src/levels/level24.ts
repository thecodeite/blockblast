import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.1111111.',
    '.1111111.',
    '.1111111.',
    '.1111111.',
    '.1111111.',
    '.1111111.',
    '.1111111.',
    '.........',
  ],
  challanges: {
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 49,
  },
  moves: 33,
}

export default level
