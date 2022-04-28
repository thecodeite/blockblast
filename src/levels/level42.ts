import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '_......._',
    '111111111',
    '_..._..._',
    '111111111',
    '_..._..._',
    '111111111',
    '_..._..._',
    '111111111',
    '_......._',
  ],
  overlay: [
    '.........',
    '000000000',
    '.........',
    '000000000',
    '.........',
    '000000000',
    '.........',
    '000000000',
    '.........',
  ],
  challanges: {
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 36,
    bubble: 36,
  },
  moves: 42,
}

export default level
