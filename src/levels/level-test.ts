import { LevelDef } from '../types'

const manyRotor = [
  'rrrrrrrro',
  'gggggggog',
  'rrrrrrorr',
  'gggggoggg',
  'rrrrorrrr',
  'gggoggggg',
  'rrrrrrrrr',
  'ggggggg↔g',
  'O↕yyyyyyy',
]

const bombTest = [
  '111111111',
  'o********',
  '111111111',
  '111111111',
  'o********',
  '111111111',
  'o********',
  '111111111',
  'O*yyyyyyy',
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

const fallTest = [
  '111111111',
  'rrrrrrrrr',
  'ooooooooo',
  'oooooooog',
  'ooooooogg',
  'ooooooggg',
  'ooooogggg',
  'ooooggggg',
  'Oyogggggg',
]

const gravity = [
  'rrr', //
  '111',
  'ooo',
  'rrr',
  'oor',
  'rrr',
]

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: fallTest,
  colours: ['red', 'green'],
  challanges: {
    '1': 'cage_block',
  },
  win: {
    red: 999,
  },
  moves: 999,
}

export default level
