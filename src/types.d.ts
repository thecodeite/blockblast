import type { Prng } from './Prng'

interface ScoresDef {
  red?: number
  green?: number
  blue?: number
  yellow?: number
  orange?: number
  purple?: number
  weight_1?: number
  weight_2?: number
  weight_3?: number
  weight_4?: number
  beachball?: number
  block?: number
  bubble?: number
  ice?: number
  cblock?: number
}
export interface LevelDef {
  height: number
  width: number
  initial: string[]
  overlay?: string[]
  overlayMap?: { [key: string]: string }
  colours: string[]
  win: ScoresDef
  moves: number

  toySymbols?: { [key: string]: string }
  challanges?: { [key: string]: string }
  spawn?: { [key: string]: number }
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
  meta?: string

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
  id: number
  prng: Prng
  levelDef: LevelDef
  columns: Cell[][]
  overlay: { [key: string]: Overlay }
  previousGame?: Game
  colStats: ColStat[]

  currentScore: { [key: string]: number }
  movesLeft: number
  hasWon?: true
  activeBooster?: string
  spawnLeft?: { [key: string]: number }
}

export interface CellColumn {
  length: number
  start: number
  bottom: boolean
}

type CellFilter = (column: CellSpace[], x: number) => CellSpace[]
