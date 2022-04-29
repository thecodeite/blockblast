import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '1.......1',
    'i1.....1i',
    'ii1...1ii',
    'iii1.1iii',
    '1iii1iii1',
    '_1iiiii1_',
    '__1iii1__',
    '___1i1___',
    '____1____',
  ],
  overlay: [
    '0.......0',
    '.0.....0.',
    '..0...0..',
    '...0.0...',
    '0...0...0',
    '.0.....0.',
    '..0...0..',
    '...0.0...',
    '....0....',
  ],
  challanges: {
    i: 'ice',
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red'],

  win: {
    block: 18,
    bubble: 18,
    ice: 27,
  },
  moves: 37,
}

export default level
