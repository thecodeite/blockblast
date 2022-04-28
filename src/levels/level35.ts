import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '........',
    '........',
    '11111111',
    '11111111',
    '        ',
    '        ',
    '        ',
  ],
  overlay: [
    '........',
    '........',
    '........',
    '........',
    '........',
    '00000000',
    '00000000',
    '00000000',
  ],
  challanges: {
    '1': 'cage_block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 16,
    bubble: 25,
  },
  moves: 32,
}

export default level
