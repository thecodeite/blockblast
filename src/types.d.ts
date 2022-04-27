export interface LevelDef {
  height: number
  width: number
  initial: string[]
  colours: string[]
  win: Scores
  moves: number

  challanges?: { [key: string]: string }
}

export interface Cell {
  remove?: boolean
  tap?: boolean
  tapped?: true
  type: 'colour' | 'toy' | 'challange'
  id: number
  variant: string
  x: number
  y: number

  onDestroy?: (cell: Cell) => Cell | RemoveCell
  onTick?: (game: Game, cell: Cell) => Cell | null
  onNeighbourPop?: (game: Game, cell: Cell, neighbour: Cell) => Cell | null
}

export interface RemoveCell extends Cell {
  remove: true
  original: Cell
}
export interface TapCell extends Cell {
  tap: true
  original: Cell
}

type CellSpace = RemoveCell | Cell | null

export type TapStep = { colls: CellSpace[][]; scores: Scores }
export type TapStep2 = { collsSets: CellSpace[][][]; scores: Scores }

export interface ColStat {
  length: number
  offsets: number[]
}

type Scores = { [key: string]: number }
export interface Game {
  levelString: string
  prng: Prng
  levelDef: LevelDef
  columns: CellSpace[][]
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
