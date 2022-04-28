import type { Prng } from './Prng'
export interface LevelDef {
  height: number
  width: number
  initial: string[]
  overlay?: string[]
  colours: string[]
  win: Scores
  moves: number

  challanges?: { [key: string]: string }
}

export interface Cell {
  remove?: true
  tap?: true
  tapped?: true
  type: 'null' | 'colour' | 'toy' | 'challange'
  id: number
  variant: string
  x: number
  y: number
  neighbours?: number

  noGravity?: true
  child?: Cell

  onDestroy?: (cell: Cell) => Cell | RemoveCell
  onTick?: (game: Game, cell: Cell) => Cell
  onNeighbourPop?: (game: Game, cell: Cell, neighbour: Cell) => Cell
}

export type TapStep = { colls: Cell[][]; scores: Scores }
export type TapStep2 = { collsSets: Cell[][][]; scores: Scores }

type Overlay = {
  x: number
  y: number
  isBubble?: true
}
export interface ColStat {
  length: number
  offsets: number[]
}

type Scores = { [key: string]: number }
export interface Game {
  levelString: string
  prng: Prng
  levelDef: LevelDef
  columns: Cell[][]
  overlay: { [key: string]: Overlay }
  nextGame?: Game
  colStats: ColStat[]

  currentScore: { [key: string]: number }
  movesLeft: number
  hasWon?: true
}

export interface CellColumn {
  length: number
  start: number
  bottom: boolean
}

type CellFilter = (column: CellSpace[], x: number) => CellSpace[]
