import { LevelDef } from '../types'

export const level6: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '_Z___X_',
    'yyp_bbg',
    'ryp_obr',
    'rob_bpr',
    'ybg_opo',
    'obgropy',
    'obpyygy',
    'ppoyggr',
    'gprrpor',
  ],
  challanges: {
    Z: 'weight_1',
    X: 'weight_2',
  },
  colours: ['blue', 'yellow', 'red', 'green', 'purple', 'orange'],

  win: {
    weight_1: 1,
    weight_2: 2,
  },
  moves: 23,
}

export default level6
