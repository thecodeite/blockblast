import { LevelDef } from '../types'

export const level8: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    'X_Y___Y_X',
    '.........',
    '.........',
    '.........',
    '_......._',
    '.........',
    '.........',
    '....Z....',
    '.........',
  ],
  challanges: {
    X: 'weight_1',
    Y: 'weight_2',
    Z: 'weight_3',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 2,
    weight_2: 2,
    weight_3: 1,
  },
  moves: 26,
}

export default level8
