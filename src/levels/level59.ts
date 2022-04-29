import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '.........',
    '000000000',
    '         ',
    '000000000',
    '         ',
    '000000000',
    '         ',
    'XXXXXXXXX',
  ],

  challanges: {
    '0': 'cage_beachball',
    X: 'cage_weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 9,
    beachball: 27,
  },
  moves: 36,
}

export default level
