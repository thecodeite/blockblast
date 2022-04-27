import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0000.0000',
    '0000.0000',
    '0000.0000',
    '0000.0000',
    '.........',
    '1111.1111',
    '1111.1111',
    '1111.1111',
    '1111.1111',
  ],
  overlay: [
    '.........',
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
    '0': 'beachball',
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 32,
    beachball: 32,
    block_1: 32,
  },
  moves: 31,
}

export default level
