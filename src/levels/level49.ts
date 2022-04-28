import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    'X_____X',
    '...0...',
    '..000..',
    '.00000.',
    '0000000',
    'iiiiiii',
    ' iiiii ',
    '  iii  ',
    '   i   ',
  ],
  overlay: [
    '       ',
    '       ',
    '       ',
    '       ',
    '       ',
    '       ',
    '       ',
    '0     0',
    '00   00',
    '000 000',
  ],
  challanges: {
    '0': 'beachball',
    i: 'ice',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    weight_1: 2,
    bubble: 12,
    beachball: 16,
    ice: 16,
  },
  moves: 36,
}

export default level
