import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '.........',
    '.........',
    '111111111',
    '111111111',
    '    _    ',
    '    _    ',
    '    _    ',
    '    _    ',
  ],
  overlay: [
    '.........',
    '.........',
    '.........',
    '.........',
    '0000.0000',
    '0000.0000',
    '0000.0000',
    '0000.0000',
  ],
  challanges: {
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 32,
    block_1: 18,
  },
  moves: 26,
}

export default level
