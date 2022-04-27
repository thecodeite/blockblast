import { LevelDef } from '../types'

export const level9: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '........',
    '00000000',
    '00000000',
    '00000000',
    '00000000',
    '........',
    '........',
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
