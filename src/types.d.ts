export interface LevelDef {
  height: number
  width: number
  initial: string[]
  colours: string[]
  win: { [key: string]: number }
  moves: number
}
