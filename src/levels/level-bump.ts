import { LevelDef } from '../types'

export const level2: LevelDef = {
  height: 5,
  width: 9,
  initial: [
    '__rrr_rrr', //
    '_bb_bbbbb', //
    'gg__g_ggg', //
    '_yy_yyyyy', //
    '__ppp_ppp', //
  ],
  colours: ['blue', 'yellow', 'red', 'orange', 'green', 'purple'],
  win: {
    yellow: 9,
    green: 26,
  },
  moves: 22,
}

export default level2
