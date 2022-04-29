import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '       .',
    'RRRRRR .',
    'YYYYYR .',
    'GGGGYR .',
    'BBBGYR .',
    '__BGYR .',
    '__BGYR .',
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
  moves: 40,
}

export default level
