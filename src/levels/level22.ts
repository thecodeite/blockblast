import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0000X0000',
    '0000X0000',
    '0000X0000',
    '0000X0000',
    '_________',
    '....r....',
    '....r....',
    '....r....',
    '....r....',
  ],
  overlay: [
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '000000000',
    '000000000',
    '000000000',
    '000000000',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 32,
    weight_1: 4,
    bubble: 36,
  },
  moves: 27,
}

export default level
