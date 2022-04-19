import { LevelDef } from '../types'

export const level5: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__.._..__',
    '_......._',
    '.........',
    '_......._',
    '...↔R....',
    '_......._',
    '.........',
    '_......._',
    '__.._..__',
  ],
  colours: ['blue', 'yellow', 'red', 'green', 'purple'],
  win: {
    yellow: 35,
    green: 10,
    purple: 35,
  },
  moves: 35,
}

export default level5
