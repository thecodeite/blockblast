import { LevelDef } from '../types'

export const level1: LevelDef = {
  height: 6,
  width: 9,
  initial: [
    'byrbobogg',
    'pbborpoob',
    'orrbryrpy',
    'opopygbry',
    'orbopbybb',
    'brbrobrby',
  ],
  colours: ['blue', 'yellow', 'red', 'orange', 'green', 'purple'],
  win: {
    red: 4,
    blue: 10,
  },
  moves: 15,
}

export default level1
