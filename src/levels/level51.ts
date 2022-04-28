import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '.........',
    '1.1.1.1.1',
    'i1i1i1i1i',
    '1i1i1i1i1',
    'i1i1i1i1i',
    '1i1i1i1i1',
    'i1i1i1i1i',
  ],
  overlay: [
    '.........',
    '.........',
    '.........',
    '.........',
    '0.0.0.0.0',
    '.0.0.0.0.',
    '0.0.0.0.0',
    '.0.0.0.0.',
    '0.0.0.0.0',
  ],
  challanges: {
    i: 'ice',
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 23,
    block_1: 27,
    ice: 23,
  },
  moves: 39,
}

export default level
