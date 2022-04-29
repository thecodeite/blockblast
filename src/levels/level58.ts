import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 9,
  initial: [
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    '0.0.0.0.0',
    ' 1 1 1 1 ',
    ' 1 1 1 1 ',
    ' 1 1 1 1 ',
    ' 1 1 1 1 ',
  ],
  challanges: {
    '0': 'cage_beachball',
    '1': 'cage_block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    block: 16,
    beachball: 20,
  },
  moves: 36,
}

export default level
