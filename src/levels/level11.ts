import { LevelDef } from '../types'

export const level11: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '000000000',
    '000000000',
    '000000000',
    '000000000',
    '_________',
    '.........',
    '.........',
    '.........',
    '.........',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 36,
  },
  moves: 34,
}

export default level11
