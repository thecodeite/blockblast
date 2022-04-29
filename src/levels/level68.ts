import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    'rrrrrrrr_',
    ' R G R Gg',
    'Y B Y B g',
    ' R G R Gg',
    'Y B Y B g',
    ' R G R Gg',
    'Y B Y B g',
    ' R G R Gg',
    'Y B Y B g',
  ],
  overlayMap: {
    ' ': 'bubble',
  },
  challanges: {
    R: 'cblock_red',
    B: 'cblock_blue',
    Y: 'cblock_yellow',
    G: 'cblock_green',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 32,
    cblock: 32,
  },
  moves: 38,
}

export default level
