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
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block: 49,
  },
  moves: 33,
}

export default level
