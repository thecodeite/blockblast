import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 7,
  initial: [
    '.......',
    '.......',
    '0000000',
    '        ',
    '0000000',
    '        ',
    '0000000',
    '        ',
  ],
  challanges: {
    '0': 'cage_beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 21,
  },
  moves: 45,
}

export default level
