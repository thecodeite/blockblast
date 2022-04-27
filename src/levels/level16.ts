import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 7,
  width: 7,
  initial: [
    '_....._',
    '.......',
    '.......',
    '.......',
    '.......',
    '.......',
    '_....._',
  ],
  overlay: [
    '.......',
    '.00000.',
    '.00000.',
    '.00000.',
    '.00000.',
    '.00000.',
    '.......',
  ],
  colours: ['blue', 'yellow', 'red', 'green', 'purple'],

  win: {
    bubble: 25,
  },
  moves: 35,
}

export default level
