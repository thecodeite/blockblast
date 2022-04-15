import { Prng } from './Prng'

let nextId = 0

export interface Cell {
  type: 'colour' | 'toy'
  id: number
  variant: string
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

function createColumn(
  prng: Prng,
  num: number,
  x: number,
  yStart: number
): Cell[] {
  return Array.from({ length: num }, (_, y) => ({
    type: 'colour',
    id: nextId++,
    x,
    y: yStart + y,
    variant: prng.nextOf(colours),
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

function isCell(cellSpace: CellSpace): cellSpace is Cell {
  return !!cellSpace
}

function doFall(column: CellSpace[]): Cell[] {
  return column.filter(isCell).map((cell, y) => ({
    ...cell,
    y,
  }))
}

const addNewCells =
  (game: Game) =>
  (column: Cell[], x: number): Cell[] => {
    const missing = game.size * 2 - column.length
    if (missing > 0) {
      const newCells = createColumn(game.prng, missing, x, column.length)
      return [...column, ...newCells]
    } else {
      return column
    }
  }

export function tap(game: Game, on: Cell): Game {
  if (on.type === 'colour') {
    return tapColour(game, on)
  } else {
    return tapToy(game, on)
  }
}

export function tapToy(game: Game, on: Cell): Game {
  let variant = on.variant
  const neighbours = findNeighbours(on, game)

  if (neighbours.size > 1) {
    const toys = [...neighbours]
      .map((c) =>
        c.variant.startsWith('cube')
          ? 'cube'
          : c.variant.startsWith('rotor')
          ? 'rotor'
          : c.variant
      )
      .reduce((p: { [key: string]: number }, v) => {
        p[v] = (p[v] || 0) + 1
        return p
      }, {})

    if (toys['cube'] >= 2) {
      variant = 'nuke'
    } else if (toys['cube'] === 1 && toys['bomb'] > 0) {
      variant = 'super_bombs'
    } else if (toys['cube'] === 1 && toys['rotor'] > 0) {
      variant = 'super_rotors'
    } else if (toys['bomb'] >= 2) {
      variant = 'mega_bomb'
    } else if (toys['bomb'] === 1 && toys['rotor'] > 0) {
      variant = 'wide_rotors'
    } else if (toys['rotor'] >= 2) {
      variant = 'cross'
    }
  }

  let filter: (column: CellSpace[], x: number) => CellSpace[] = (c) => c
  console.log('variant:', variant)
  if (variant === 'rotorH') {
    filter = (column) => column.map((cell, y) => (on.y === y ? null : cell))
  } else if (variant === 'rotorV') {
    filter = (column, x) =>
      column.map((cell, y) => (on.x === x && y < game.size ? null : cell))
  } else if (variant === 'cross') {
    filter = (column, x) =>
      column.map((cell, y) =>
        y < game.size && (on.x === x || on.y === y) ? null : cell
      )
  } else if (variant === 'wide_rotors') {
    const near = (x: number, y: number) => {
      const dx = on.x - x
      const dy = on.y - y
      return Math.abs(dx) <= 1 || Math.abs(dy) <= 1
    }
    filter = (column, x) => column.map((cell, y) => (near(x, y) ? null : cell))
  } else if (variant === 'bomb' || variant === 'mega_bomb') {
    const size = variant === 'bomb' ? 1 : 3
    const near = (x: number, y: number) => {
      const dx = on.x - x
      const dy = on.y - y
      return Math.abs(dx) <= size && Math.abs(dy) <= size
    }
    filter = (column, x) => column.map((cell, y) => (near(x, y) ? null : cell))
  } else if (variant.startsWith('cube_')) {
    const burnColour = on.variant.substring('cube_'.length)

    filter = (column) =>
      column.map((cell, y) =>
        cell === on || (y < game.size && cell?.variant === burnColour)
          ? null
          : cell
      )
  } else if (variant === 'nuke') {
    filter = (column) => column.map((cell, y) => (y < game.size ? null : cell))
  } else {
    return game
  }

  const columns = game.columns.map(filter).map(doFall).map(addNewCells(game))

  return {
    ...game,
    columns,
  }
}

export function tapColour(game: Game, on: Cell): Game {
  const neighbours = findNeighbours(on, game)
  let toy: Cell | undefined = undefined
  const size = neighbours.size

  if (size <= 1) {
    return game
  } else if (size >= 5) {
    let variant = 'bomb'
    if (size <= 6) {
      variant = game.prng.nextOf(['rotorH', 'rotorV'])
    } else if (size > 8) {
      variant = 'cube_' + on.variant
    }

    toy = {
      type: 'toy',
      id: nextId++,
      x: on.x,
      y: on.y,
      variant,
    }
  }

  const neighboursIds = [...neighbours].map((x) => x.id)

  const removeNeighbours = (cell: CellSpace) =>
    cell && neighboursIds.includes(cell.id) ? null : cell

  const addToyAt = (column: CellSpace[], x: number): CellSpace[] => {
    if (toy === undefined) return column
    const t = toy
    const cols = column.map((cell, y) => (t.x === x && t.y === y ? t : cell))
    return cols
  }

  const columns = game.columns
    .map((column) => column.map(removeNeighbours))
    .map(addToyAt)
    .map(doFall)
    .map(addNewCells(game))

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

  const isNeigbour =
    cell.type === 'colour'
      ? (c: Cell) => c.variant === cell.variant
      : (c: Cell) => c.type === 'toy'

  function isCell(c: CellSpace | undefined): c is Cell {
    return !!c && isNeigbour(c)
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
