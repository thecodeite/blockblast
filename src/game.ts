import { Prng } from './Prng'

let nextId = 0

export interface Cell {
  id: number
  colour: string
  x: number
  y: number
}

type CellSpace = Cell | null

export interface Game {
  prng: Prng
  size: number
  columns: CellSpace[][]
}

const colours = ['red', 'blue', 'green', 'yellow']
const size = 9

function createColumn(prng: Prng, num: number, x: number, yStart: number) {
  return Array.from({ length: num }, (_, y) => ({
    id: nextId++,
    x,
    y: yStart + y,
    colour: prng.nextOf(colours),
  }))
}

export function createGame(): Game {
  const prng = new Prng('test')
  const columns: Cell[][] = Array.from({ length: size }, (_, x) => {
    return createColumn(prng, size * 2, x, 0)
  })

  return {
    prng,
    size,
    columns,
  }
}

export function tap(game: Game, on: Cell) {
  const neighbours = findNeighbours(on, game)

  if (neighbours.size <= 1) {
    return game
  }

  const neighboursIds = [...neighbours].map((x) => x.id)

  const removeNeighbours = (cell: CellSpace) =>
    cell && neighboursIds.includes(cell.id) ? null : cell

  function isCell(cellSpace: CellSpace): cellSpace is Cell {
    return !!cellSpace
  }

  const doFall = (column: CellSpace[]): Cell[] =>
    column.filter(isCell).map((cell, y) => ({
      ...cell,
      y,
    }))

  const addNewCells = (column: Cell[], x: number): Cell[] => {
    const missing = game.size * 2 - column.length
    if (missing > 0) {
      const newCells = createColumn(game.prng, missing, x, column.length)
      return [...column, ...newCells]
    } else {
      return column
    }
  }

  const columns = game.columns
    .map((column) => column.map(removeNeighbours))
    .map(doFall)
    .map(addNewCells)

  return {
    ...game,
    columns,
  }
}

const cardinalNeighbourIds = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
function findNeighbours(cell: Cell, game: Game) {
  const allCells = game.columns.flat()
  const neighbours = new Set([cell])
  const search = [cell]

  function isCell(c: CellSpace | undefined): c is Cell {
    return !!c && c.colour === cell.colour
  }

  while (search.length > 0) {
    const searchCell = search.pop() as Cell
    const cardinalNeighbours = cardinalNeighbourIds
      .map(([x, y]) =>
        allCells.find(
          (c) =>
            searchCell.y + y < game.size &&
            c !== null &&
            c.x === searchCell.x + x &&
            c.y === searchCell.y + y
        )
      )
      .filter((c) => c?.colour === searchCell?.colour)
      .filter(isCell)

    cardinalNeighbours.forEach((cn) => {
      if (!neighbours.has(cn)) {
        neighbours.add(cn)
        search.push(cn)
      }
    })
  }

  return neighbours
}
