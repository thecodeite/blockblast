import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '.....BBB',
    '....YBB ',
    '...YYB  ',
    '..YYY   ',
    '.RRR    ',
    '.RR     ',
    '.R      ',
  ],
  overlayMap: {
    ' ': 'bubble',
  },
  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 21,
    cblock: 18,
  },
  moves: 31,
}

export default level
