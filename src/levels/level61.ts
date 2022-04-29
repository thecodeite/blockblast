import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '_..___.._',
    '...._....',
    '...._....',
    '...._....',
    'RRRR_BBBB',
    '    _    ',
    '    _    ',
    '    _    ',
    'YYYY_GGGG',
  ],

  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
    G: 'cblock_green',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    cblock: 16,
  },
  moves: 50,
}

export default level
