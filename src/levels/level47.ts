import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '.........',
    '000000000',
    '0iiiiiii0',
    '0iiiiiii0',
    '0iiiiiii0',
    '0iiiiiii0',
    '000000000',
  ],
  challanges: {
    '0': 'beachball',
    i: 'ice',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 26,
    ice: 28,
  },
  moves: 38,
}

export default level
