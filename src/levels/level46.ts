import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 7,
  initial: [
    '.......',
    '.......',
    '.......',
    '_....._',
    '_iiiii_',
    'iiiiiii',
    'iiiiiii',
    'iiiiiii',
  ],
  challanges: {
    i: 'ice',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    ice: 26,
  },
  moves: 45,
}

export default level
