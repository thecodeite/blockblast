import { LevelDef } from '../types'

export const level7: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__X_Y_Z__',
    '_......._',
    '_......._',
    '_......._',
    '_._._._._',
    '.........',
    '.........',
    '.........',
    '.........',
  ],
  challanges: {
    X: 'weight_1',
    Y: 'weight_2',
    Z: 'weight_3',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 1,
    weight_2: 1,
    weight_3: 1,
  },
  moves: 22,
}

export default level7
