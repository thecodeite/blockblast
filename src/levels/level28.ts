import { LevelDef } from '../types'

export const level: LevelDef = {
  height: 9,
  width: 9,
  initial: [
    '____X____',
    '__..1..__',
    '__..1..__',
    '__..1..__',
    'XX..1..XX',
    '11..1..11',
    '11..1..11',
    '11..1..11',
    '11..1..11',
  ],
  overlay: [
    '.........',
    '....0....',
    '....0....',
    '....0....',
    '....0....',
    '00..0..00',
    '00..0..00',
    '00..0..00',
    '00..0..00',
  ],
  challanges: {
    '1': 'block',
    X: 'weight_1',
  },
  colours: ['blue', 'yellow', 'red', 'green'],

  win: {
    bubble: 24,
    block: 24,
    weight_1: 5,
  },
  moves: 32,
}

export default level
