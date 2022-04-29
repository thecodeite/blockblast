import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0000.1111',
    '0000.1111',
    '0000.1111',
    '0000.1111',
    '_________',
    '    _    ',
    '    _    ',
    '    _    ',
    '    _    ',
  ],
  overlay: [
    '.........',
    '.........',
    '.........',
    '.........',
    '.........',
    '0000.0000',
    '0000.0000',
    '0000.0000',
    '0000.0000',
  ],
  challanges: {
    '0': 'cage_beachball',
    '1': 'cage_block',
  },
  colours: ['blue', 'yellow', 'red'],

  win: {
    beachball: 16,
    block: 16,
    bubble: 32,
  },
  moves: 34,
}

export default level
