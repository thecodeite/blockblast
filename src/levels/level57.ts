import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '....11111',
    '....11111',
    '....11111',
    '....11111',
    '1111_1111',
    '11111____',
    '11111____',
    '11111____',
    '11111____',
  ],
  overlayMap: {
    '1': 'bubble',
  },
  challanges: {
    '1': 'block_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block_1: 48,
    bubble: 48,
  },
  moves: 38,
}

export default level
