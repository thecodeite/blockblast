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

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: bombLine,
  colours: ['red', 'green'],
  win: {
    red: 999,
  },
  moves: 999,
}

export default level
