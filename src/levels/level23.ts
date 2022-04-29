import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '.......',
    '.......',
    '1111111',
    '1111111',
    '1111111',
    '.......',
    '1111111',
    '1111111',
    '1111111',
  ],
  challanges: {
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block: 42,
  },
  moves: 35,
}

export default level
