import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '........',
    '........',
    '........',
    '...__...',
    '...__...',
    '........',
    '........',
    '........',
  ],
  overlay: [
    '00000000',
    '00000000',
    '00000000',
    '000__000',
    '000__000',
    '00000000',
    '00000000',
    '00000000',
  ],
  spawn: { beachball: 45 },
  challanges: {
    '0': 'beachball',
  },

  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 45,
    bubble: 60,
  },
  moves: 38,
}

export default level
