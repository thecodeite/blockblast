import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__0...1__',
    '_00...11_',
    '000...111',
    '000...111',
    '000...111',
    '000...111',
    '000...111',
    '_00...11_',
    '__0...1__',
  ],
  challanges: {
    '0': 'beachball',
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 21,
    block: 21,
  },
  moves: 26,
}

export default level
