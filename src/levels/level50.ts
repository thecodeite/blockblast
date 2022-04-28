import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    'i......',
    'ii.....',
    'iii....',
    'iiii...',
    'iiiii..',
    'iiiiii.',
    'iiiiiii',
    'iiiiiii',
    'iiiiiii',
  ],
  overlay: [
    '0......',
    '00.....',
    '000....',
    '0000...',
    '00000..',
    '000000.',
    '0000000',
    '0000000',
    '0000000',
  ],
  challanges: {
    i: 'ice',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    ice: 42,
    bubble: 42,
  },
  moves: 33,
}

export default level
