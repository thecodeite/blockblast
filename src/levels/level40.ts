import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '___.1.___',
    '__..1..__',
    '_..111.._',
    '..11111..',
    '1111_1111',
    '  11111  ',
    '_  111  _',
    '__  1  __',
    '___ 1 ___',
  ],
  challanges: {
    '1': 'cage_block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block: 28,
  },
  moves: 33,
}

export default level
