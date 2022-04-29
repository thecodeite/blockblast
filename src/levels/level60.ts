import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '11.....11',
    '111...111',
    ' 111.111 ',
    '  11_11  ',
    '   ___   ',
    '  11_11  ',
    ' 111i111 ',
    '111iii111',
    '11iiiii11',
  ],
  overlayMap: {
    ' ': 'bubble',
  },
  challanges: {
    i: 'ice',
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 18,
    block: 40,
    ice: 9,
  },
  moves: 33,
}

export default level
