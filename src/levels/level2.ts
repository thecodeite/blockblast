import { LevelDef } from '../types'

export const level2: LevelDef = {
  height: 8,
  width: 7,
  initial: [
    'gyybypp',
    'rgbopro',
    'pgpbgpy',
    'yrbbryr',
    'bpbbrgb',
    'yygogoy',
    'rrbrgpy',
    'oyrbyyy',
  ],
  colours: ['blue', 'yellow', 'red', 'orange', 'green', 'purple'],
  win: {
    blue: 7,
    yellow: 12,
  },
  moves: 15,
}

export default level2
