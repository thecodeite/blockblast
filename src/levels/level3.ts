import { LevelDef } from '../types'

export const level2: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '___rpb___',
    '__rbrpr__',
    '_bpgygbg_',
    'gygyyygpr',
    'gpbyyyrby',
    'brprprbgb',
    '_pygbypg_',
    '__ggggy__',
    '___ygg___',
  ],
  colours: ['blue', 'yellow', 'red', 'orange', 'green', 'purple'],
  win: {
    yellow: 9,
    green: 26,
  },
  moves: 22,
}

export default level2
