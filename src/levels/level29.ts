import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    'X_______X',
    '00_____00',
    '000___000',
    '000._.000',
    '000._.000',
    '000._.000',
    '_00._.00_',
    '__0._.0__',
    '___._.___',
  ],
  overlay: [
    '.........',
    '00.....00',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '.00...00.',
    '..0...0..',
    '.........',
  ],
  challanges: {
    '0': 'beachball',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 34,
    beachball: 34,
    weight_1: 2,
  },
  moves: 26,
}

export default level
