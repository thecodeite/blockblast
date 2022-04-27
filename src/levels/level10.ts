import { LevelDef } from '../types'

export const level10: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '0_______0',
    '00_____00',
    '000___000',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
    '000...000',
  ],
  challanges: {
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    beachball: 48,
  },
  moves: 35,
}

export default level10
