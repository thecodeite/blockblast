import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '.........',
    '..23334..',
    '..90005..',
    '_.90005._',
    '_.90005._',
    '_.90005._',
    '..90005..',
    '..87776..',
    '.........',
  ],
  // ab
  // cd
  challanges: {
    '0': 'beachball',
    '2': 'block_d',
    '3': 'block_cd',
    '4': 'block_c',
    '5': 'block_ac',
    '6': 'block_a',
    '7': 'block_ab',
    '8': 'block_b',
    '9': 'block_bd',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 15,
    block: 20,
  },
  moves: 45,
}

export default level
