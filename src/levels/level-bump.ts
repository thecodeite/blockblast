import { LevelDef } from '../types'

export const level2: LevelDef = {
  height: 5,
  width: 9,
  initial: [
    'rrrr_r___', //
    'bbbbbbb__', //
    '_ggggggg_', //
    '__yyyyyyy', //
    '___p_pppp', //
  ],
  colours: ['blue', 'yellow', 'red', 'orange', 'green', 'purple'],
  win: {
    yellow: 9,
    green: 26,
  },
  moves: 22,
}

export default level2
