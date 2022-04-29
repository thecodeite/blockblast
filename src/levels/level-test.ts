import { LevelDef } from '../types'

const manyRotor = [
  'rrrrrrrrr',
  'bgbbgbbgb',
  'rrrrrrrrr',
  'rrrrrrrrr',
  'bbbbbbbbb',
  // '↔↔↔↔↔↔↔r↔',
  'yyyyyyyyy',
  'yyyyyyyy↕',
  'G↕yyyyyy↔',
]

const twoRotor = [
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '↔.......↕',
]

const bombLine = [
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '.........',
  '↕........',
  '.........',
  '*********',
]

const needMix = [
  'rrr', //
  '111',
  'ooo',
  'rrr',
  'oor',
  'rrr',
]

export const level: LevelDef = {
  height: 6,
  width: 3,
  initial: needMix,
  colours: ['red', 'green'],
  challanges: {
    '1': 'cage_block_1',
  },
  win: {
    red: 999,
  },
  moves: 999,
}

export default level
