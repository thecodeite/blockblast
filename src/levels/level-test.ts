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
  'rrrrr', //
  'gbgbg',
  'bbbbb',
  'ooooo',
  'oooor',
]

export const level: LevelDef = {
  height: 5,
  width: 5,
  initial: needMix,
  colours: ['red', 'green'],
  win: {
    red: 999,
  },
  moves: 999,
}

export default level
