export interface LevelDef {
  height: number
  width: number
  initial: string[]
  colours: string[]
  win: { [key: string]: number }
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

export interface ColStat {
  length: number
  offsets: number[]
}

interface Score {
  name: string
  left: number
}
export interface Game {
  prng: Prng
  levelDef: LevelDef
  columns: CellSpace[][]
  nextGame?: Game
  colStats: ColStat[]

  score: Score[]
  movesLeft: number
}

export interface CellColumn {
  length: number
  start: number
  bottom: boolean
}

type CellFilter = (column: CellSpace[], x: number) => CellSpace[]
