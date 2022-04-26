import { LevelDef } from '../types'

export const level9: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '.........',
    '.........',
    '000000000',
    '000000000',
    '000000000',
    '000000000',
    '.........',
    '.........',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 32,
  },
  moves: 30,
}

export default level9
