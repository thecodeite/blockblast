import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '0 0 0 0 0',
    '         ',
    ' 0 0 0 0 ',
    '         ',
    '0 0 0 0 0',
    'iiiiiiiii',
    'iiiiiiiii',
  ],
  challanges: {
    0: 'cage_beachball',
    i: 'ice',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    ice: 18,
    beachball: 14,
  },
  moves: 33,
}

export default level
