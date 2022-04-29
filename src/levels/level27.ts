import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 8,
  width: 8,
  initial: [
    '.....111',
    '.....111',
    '..111111',
    '..1111  ',
    '..1111  ',
    '111111  ',
    '111     ',
    '111     ',
  ],
  overlay: [
    '........',
    '........',
    '........',
    '......00',
    '......00',
    '......00',
    '...00000',
    '...00000',
  ],
  challanges: {
    '1': 'block',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 16,
    block: 32,
  },
  moves: 37,
}

export default level
