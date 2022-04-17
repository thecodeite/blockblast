import { Prng } from './Prng'
import { LevelDef } from './types'

let nextId = 0

export interface Cell {
  remove?: boolean
  tap?: boolean
  tapped?: true
  type: 'colour' | 'toy'
  id: number
  variant: string
  x: number
  y: number
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

export interface Game {
  prng: Prng
  levelDef: LevelDef
  columns: CellSpace[][]
  nextGame?: Game
}

type CellFilter = (column: CellSpace[], x: number) => CellSpace[]

// const colours = ['red', 'blue', 'green', 'yellow']

function createColumn(
  { prng, levelDef: { colours } }: Game,
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

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}
function notUndefinedOrNull<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null
}

export function createGame(levelDef: LevelDef): Game {
  const prng = new Prng('test')

  const stringCols = Array.from({ length: levelDef.width }, (_, x) => {
    return levelDef.initial.reduce((p, c) => p + c[x], '')
  })

  const colourSymbols: { [key: string]: string } = {
    r: 'red',
    y: 'yellow',
    b: 'blue',
    g: 'green',
    o: 'orange',
    p: 'purple',
  }

  const toySymbols: { [key: string]: string } = {
    '↔': 'rotorH',
    '↕': 'rotorV',
    '*': 'bomb',
    R: 'cube_red',
    Y: 'cube_yellow',
    B: 'cube_blue',
    G: 'cube_green',
    O: 'cube_orange',
    P: 'cube_purple',
  }

  const columns: Cell[][] = stringCols.map((str, x) => {
    return str
      .split('')
      .reverse()
      .map((ch, y) => {
        if (colourSymbols[ch]) {
          return {
            type: 'colour',
            id: nextId++,
            x,
            y,
            variant: colourSymbols[ch],
          }
        } else if (toySymbols[ch]) {
          return {
            type: 'toy',
            id: nextId++,
            x,
            y,
            variant: toySymbols[ch],
          }
          // } else if (ch === '_') {
          //   return
        } else {
          return {
            type: 'colour',
            id: nextId++,
            x,
            y,
            variant: prng.nextOf(levelDef.colours),
          }
        }
      })
  })

  const game = {
    prng,
    levelDef,
    columns,
  }

  const withNewCells = columns.map(addNewCells(game))

  return {
    ...game,
    columns: withNewCells,
  }

  // const prng = new Prng('test')
  // const columns: Cell[][] = Array.from({ length: size }, (_, x) => {
  //   return createColumn(prng, size * 2, x, 0)
  // })

  // return {
  //   prng,
  //   size,
  //   columns,
  // }
}

function isCell(cellSpace: CellSpace): cellSpace is Cell {
  return !!cellSpace
}

function doRemove(column: CellSpace[], x: number): CellSpace[] {
  return column.map((cell) => (cell?.remove ? null : cell))
}

function doFall(column: CellSpace[]): Cell[] {
  return column.filter(isCell).map((cell, y) => ({
    ...cell,
    y,
  }))
}

const toRemove = (
  cell: CellSpace,
  force?: true
): null | RemoveCell | TapCell => {
  if (cell) {
    if (cell.type === 'colour' || force) {
      return { ...cell, original: cell, remove: true }
    } else {
      return { ...cell, original: cell, tap: true }
    }
  } else {
    return null
  }
}

function addNewCells(game: Game) {
  return (column: Cell[], x: number): Cell[] => {
    const missing = game.levelDef.height * 2 - column.length
    if (missing > 0) {
      const newCells = createColumn(game, missing, x, column.length)
      return [...column, ...newCells]
    } else {
      return column
    }
  }
}

export function tap(game: Game, on: Cell): Game {
  if (on.type === 'colour') {
    return tapColour(game, on)
  } else {
    return tapFirstToy(game, on)
  }
}

function removeCell(cellToRemove: Cell) {
  return (column: CellSpace[]) =>
    column.map((cell) =>
      cell && cellToRemove.id === cell.id ? toRemove(cell, true) : cell
    )
}

function isIn(cells: Cell[], game: Game) {
  const ids = cells.map((cell) => cell.id)
  const filter: CellFilter = (column, x) =>
    column.map((cell, y) =>
      cell && ids.includes(cell.id) && y < game.levelDef.height ? null : cell
    )

  return filter
}

export function tapFirstToy(game: Game, on: Cell): Game {
  function tapToy(
    columns: CellSpace[][],
    on: Cell,
    isHuman: boolean
  ): CellSpace[][][] {
    if (on.tap) return []

    let variant = on.variant
    const neighbours = isHuman
      ? findNeighbours(on, { ...game, columns })
      : new Set([on])

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
        variant = 'multi_bombs'
      } else if (toys['cube'] === 1 && toys['rotor'] > 0) {
        variant = 'multi_rotors'
      } else if (toys['bomb'] >= 2) {
        variant = 'mega_bomb'
      } else if (toys['bomb'] === 1 && toys['rotor'] > 0) {
        variant = 'wide_rotors'
      } else if (toys['rotor'] >= 2) {
        variant = 'cross'
      }
    }

    let filter: CellFilter = (c) => c

    if (variant === 'rotorH') {
      filter = (column) =>
        column.map((cell, y) => (on.y === y ? toRemove(cell) : cell))
    } else if (variant === 'rotorV') {
      filter = (column, x) =>
        column.map((cell, y) =>
          on.x === x && y < game.levelDef.height ? toRemove(cell) : cell
        )
    } else if (variant === 'cross') {
      filter = (column, x) =>
        column.map((cell, y) =>
          y < game.levelDef.height && (on.x === x || on.y === y)
            ? toRemove(cell)
            : cell
        )
    } else if (variant === 'wide_rotors') {
      const near = (x: number, y: number) => {
        const dx = on.x - x
        const dy = on.y - y
        return Math.abs(dx) <= 1 || Math.abs(dy) <= 1
      }
      filter = (column, x) =>
        column.map((cell, y) => (near(x, y) ? toRemove(cell) : cell))
    } else if (variant === 'bomb' || variant === 'mega_bomb') {
      const size = variant === 'bomb' ? 1 : 3
      const near = (x: number, y: number) => {
        const dx = on.x - x
        const dy = on.y - y
        return Math.abs(dx) <= size && Math.abs(dy) <= size
      }
      filter = (column, x) =>
        column.map((cell, y) => (near(x, y) ? toRemove(cell) : cell))
    } else if (variant.startsWith('cube_')) {
      const burnColour = on.variant.substring('cube_'.length)

      filter = (column) =>
        column.map((cell, y) =>
          cell === on ||
          (y < game.levelDef.height && cell?.variant === burnColour)
            ? toRemove(cell)
            : cell
        )
    } else if (variant === 'nuke') {
      filter = (column) =>
        column.map((cell, y) =>
          y < game.levelDef.height ? toRemove(cell) : cell
        )
    } else if (variant === 'multi_rotors') {
      const cube = [...neighbours].find((cell) =>
        cell.variant.startsWith('cube')
      )
      if (!cube) return [columns]
      const colour = cube.variant.substring('cube_'.length)

      const matches = columns
        .flatMap((cells) => cells.filter((cell) => cell?.variant === colour))
        .filter(notUndefinedOrNull)

      const collSets: CellSpace[][][] = []
      let colls = columns
      const rotors = matches
        .map((colourCell) => {
          let rotor: Cell | undefined = undefined
          const makeRotor = (cell: Cell) => {
            rotor = {
              ...cell,
              type: 'toy',
              variant: game.prng.nextOf(['rotorH', 'rotorV']),
              id: nextId++,
            } as Cell
            return rotor
          }
          const nextSet = colls.map((cells) =>
            cells.map((cell, y) =>
              cell && y < game.levelDef.height && cell.id === colourCell.id
                ? makeRotor(cell)
                : cell
            )
          )
          collSets.push(nextSet)
          colls = nextSet
          return rotor as undefined | Cell
        })
        .filter(notUndefined)
        .reverse()

      const withRemove = colls.map(isIn([...neighbours], game))

      collSets.push(withRemove)

      rotors.forEach((rotor) => {
        colls = collSets[collSets.length - 1]
        const cells = colls.flat()
        const currentRotor = cells.find((cell) => cell && cell.id === rotor.id)

        if (currentRotor) {
          console.log(`rotor found`, currentRotor)
          const moves = tapToy(colls, currentRotor, false)
          console.log('moves.length:', moves.length)
          collSets.push(...moves)
        }
      })
      colls = collSets[collSets.length - 1]
      const withFall = colls.map(doFall).map(addNewCells(game))
      collSets.push(withFall)

      console.log('collSets.length:', collSets.length)
      return collSets
    } else if (variant === 'multi_bombs') {
      const cube = [...neighbours].find((cell) =>
        cell.variant.startsWith('cube')
      )
      if (!cube) return [columns]
      const colour = cube.variant.substring('cube_'.length)

      const matches = columns
        .flatMap((cells) => cells.filter((cell) => cell?.variant === colour))
        .filter(notUndefinedOrNull)

      const collSets: CellSpace[][][] = []
      let colls = columns
      const bombs = matches
        .map((colourCell) => {
          let bomb: Cell | undefined = undefined
          const makeBomb = (cell: Cell) => {
            bomb = {
              ...cell,
              type: 'toy',
              variant: 'bomb',
              id: nextId++,
            } as Cell
            return bomb
          }
          const nextSet = colls.map((cells) =>
            cells.map((cell, y) =>
              cell && y < game.levelDef.height && cell.id === colourCell.id
                ? makeBomb(cell)
                : cell
            )
          )
          collSets.push(nextSet)
          colls = nextSet
          return bomb as undefined | Cell
        })
        .filter(notUndefined)
        .reverse()

      const withRemove = colls.map(isIn([...neighbours], game))

      collSets.push(withRemove)

      bombs.forEach((bomb) => {
        colls = collSets[collSets.length - 1]
        const cells = colls.flat()
        const currentBomb = cells.find((cell) => cell && cell.id === bomb.id)

        if (currentBomb) {
          const moves = tapToy(colls, currentBomb, false)
          collSets.push(...moves)
        }
      })

      colls = collSets[collSets.length - 1]
      const withFall = colls.map(doFall).map(addNewCells(game))
      collSets.push(withFall)

      return collSets
    } else {
      return [columns]
    }
    // const toRemove = columns.map(filter)

    const withRemove = columns.map(filter).map(removeCell(on))
    const toysToTap = withRemove
      .flatMap((col) =>
        col.map((cell) => {
          if (cell?.tap === true) {
            const remove = cell as TapCell
            return remove.original
          }
          return undefined
        })
      )
      .filter(notUndefined)

    const withNull = withRemove.map(doRemove)
    const moves = [withRemove, withNull]
    if (toysToTap.length > 0) {
      console.log('toysToTap:', toysToTap.length)
      return toysToTap.reduce((p, c) => {
        const res = tapToy(p[p.length - 1], c, false)
        return [...p, ...res]
      }, moves)
    }
    return moves
  }

  const moves = tapToy(game.columns, on, true)
  const last = moves[moves.length - 1]
  const withFall = last.map(doFall).map(addNewCells(game))
  return createGames([...moves, withFall], game)
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
    cell && neighboursIds.includes(cell.id) ? toRemove(cell) : cell

  const addToyAt = (column: CellSpace[], x: number): CellSpace[] => {
    if (toy === undefined) return column
    const t = toy
    const cols = column.map((cell, y) => (t.x === x && t.y === y ? t : cell))
    return cols
  }

  const withRemove = game.columns.map((column) => column.map(removeNeighbours))
  const withNull = withRemove.map(doRemove)
  const withToy = withNull.map(addToyAt)
  const withFall = withToy.map(doFall).map(addNewCells(game))

  return createGames([withRemove, withRemove, withToy, withFall], game)
}

function createGames(
  columnsList: CellSpace[][][],
  game: Game,
  then?: (game: Game) => Game
): Game {
  const [columns, ...tail] = columnsList

  const res = {
    ...game,
    columns,
    nextGame:
      tail.length === 0
        ? then?.({ ...game, columns })
        : createGames(tail, game),
  }

  return res
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
            searchCell.y + y < game.levelDef.height &&
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
