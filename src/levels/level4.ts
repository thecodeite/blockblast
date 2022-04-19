import { LevelDef } from '../types'

export const level4: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '__ppypp__',
    '__prpgy__',
    'pbbbgyrpy',
    'ygpppprgp',
    'brpppppbg',
    'pbrgrgybg',
    'ppyprrypb',
    '__yrgpp__',
    '__brggb__',
  ],
  colours: ['blue', 'yellow', 'red', 'green', 'purple'],
  win: {
    yellow: 18,
    green: 18,
    purple: 25,
  },
  moves: 28,
}

export default level4
