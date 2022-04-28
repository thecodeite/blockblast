import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
  ],
  overlay: [
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
  ],
  challanges: {
    '0': 'cage_beachball',
    '1': 'cage_block_1',
    X: 'cage_weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 1,
    block_1: 1,
    weight_1: 1,
  },
  moves: 99,
}

export default level
