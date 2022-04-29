import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '........',
    'RRYYGGBB',
    'RRYYGGBB',
    'RRYYGGBB',
    'RRYYGGBB',
    '........',
    '........',
  ],

  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
    G: 'cblock_green',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    cblock: 32,
  },
  moves: 44,
}

export default level
