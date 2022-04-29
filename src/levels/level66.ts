import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 7,
  initial: [
    '.......',
    '.......',
    '.......',
    '_RYGBR_',
    '_RYGBR_',
    '_RYGBR_',
    '0000000',
    '0000000',
    '0000000',
  ],
  overlayMap: {
    '0': 'bubble',
  },
  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
    G: 'cblock_green',
    '0': 'beachball',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 21,
    cblock: 15,
    beachball: 21,
  },
  moves: 45,
}

export default level
