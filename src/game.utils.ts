import { isCell, notUndefined, notUndefinedOrNull, toRemove } from './cellUtils'
import {
  Cell,
  Game,
  LevelDef,
  Overlay,
  Scores,
  TapStep,
  TapStep2,
} from './types'

let _nextId = 0

export function nextId() {
  return _nextId++
}

export const cardinalNeighbourIds = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
export function findNeighbours(
  cell: Cell,
  columns: Cell[][],
  levelDef: LevelDef
) {
  const allCells = columns.flat()
  const neighbours = new Set([cell])
  const search = [cell]

  const isNeigbour =
    cell.type === 'colour'
      ? (c: Cell) => c.variant === cell.variant
      : (c: Cell) => c.type === 'toy'

  function isNeigbourCell(c: Cell | undefined): c is Cell {
    return !!c && isNeigbour(c)
  }

  while (search.length > 0) {
    const searchCell = search.pop() as Cell
    const cardinalNeighbours = cardinalNeighbourIds
      .map(([x, y]) =>
        allCells.find(
          (c) =>
            searchCell.y + y < levelDef.height &&
            c !== null &&
            c.x === searchCell.x + x &&
            c.y === searchCell.y + y
        )
      )
      .filter(isNeigbourCell)

    cardinalNeighbours.forEach((cn) => {
      if (!neighbours.has(cn)) {
        neighbours.add(cn)
        search.push(cn)
      }
    })
  }

  return neighbours
}

export function createColumn(
  { prng, colStats, levelDef: { colours } }: Game,
  num: number,
  x: number,
  yStart: number
): Cell[] {
  return Array.from({ length: num }, (_, yIndex) => {
    const y = colStats[x].offsets[yStart + yIndex]
    return {
      type: 'colour',
      id: nextId(),
      x,
      y,
      variant: prng.nextOf(colours),
    }
  })
}

export function doFall(game: Game) {
  const { colStats } = game
  return (column: Cell[], x: number): Cell[] => {
    return column
      .filter((c) => c.type !== 'null')
      .map((cell, yIndex) => {
        const colStat = colStats[x]
        const y = colStat.offsets[yIndex]

        return {
          ...cell,
          y,
        }
      })
  }
}

export function addNewCells(game: Game) {
  return (column: Cell[], x: number): Cell[] => {
    const totalExpected = game.colStats[x].length * 2
    const missing = totalExpected - column.length
    //const spare = game.colStats[x].length - missing
    const yStart = totalExpected - missing

    if (missing > 0) {
      const newCells = createColumn(game, missing, x, yStart)
      return [...column, ...newCells]
    } else {
      return column
    }
  }
}

export function mergeScores(scoresList: Scores[]) {
  return scoresList.reduce((total, score) => {
    Object.entries(score).forEach(([variant, count]) => {
      total[variant] = (total[variant] || 0) + count
    })
    return total
  })
}

export function applyScore(game: Game, scoreChange: Scores): Game {
  const { currentScore } = game
  const newScores = Object.entries(currentScore).map(([variant, count]) => {
    if (scoreChange[variant] > 0) {
      const newScore = Math.max(count - scoreChange[variant], 0)
      return [variant, newScore]
    }
    return [variant, count]
  })
  return {
    ...game,
    currentScore: Object.fromEntries(newScores),
  }
}

export function createGames(columnsList: Cell[][][], game: Game): Game {
  const [columns, ...tail] = columnsList

  const overlay = calcNewOverlay(game, columns)
  const nextGame = {
    ...game,
    overlay,
    movesLeft: game.movesLeft - 1,
    columns,
    nextGame:
      tail.length === 0 ? undefined : createGames(tail, { ...game, overlay }),
  }

  return nextGame
}

function calcNewOverlay(
  game: Game,
  withRemove: Cell[][]
): { [key: string]: Overlay } {
  const removes = withRemove
    .flat()
    .filter(
      (c) => (c.remove || c.tap) && (c.type === 'colour' || c.type === 'toy')
    )
  const overlay = { ...game.overlay }
  removes.forEach((cell) => {
    const key = `${cell.x},${cell.y}`
    if (overlay[key]?.isBubble) {
      overlay[key] = {
        ...overlay[key],
        isBubble: undefined,
      }
    }
  })

  return overlay
}

export function applyPopEffect(
  game: Game,
  columns: Cell[][],
  poppingCells: Cell[]
): Cell[][] {
  const allCells = columns.flat()
  const pops = new Map<number, Cell>()
  poppingCells.forEach((poppingCell) => {
    cardinalNeighbourIds
      .map(([x, y]) =>
        allCells.find(
          (c) =>
            poppingCell.y + y < game.levelDef.height &&
            c !== null &&
            c.x === poppingCell.x + x &&
            c.y === poppingCell.y + y
        )
      )
      .filter((cell) => cell?.onNeighbourPop)
      .filter(notUndefinedOrNull)
      .forEach((cell) => pops.set(cell.id, poppingCell))
  })

  //console.log('pops:', pops)
  const withPopEffect = columns.map((column) =>
    column.map((cell) => {
      if (cell && pops.has(cell.id) && cell.onNeighbourPop) {
        const poppingCell = pops.get(cell.id) as Cell
        return cell.onNeighbourPop(game, cell, poppingCell)
      } else {
        return cell
      }
    })
  )

  return withPopEffect
}

export function calcOverlayScore(
  game: Game,
  ...columnSets: Cell[][][]
): Scores {
  const count = columnSets.reduce((p, colls) => {
    const removes = colls
      .flat()
      .filter(
        (c) => (c.remove || c.tap) && (c.type === 'colour' || c.type === 'toy')
      )
    const overlaysPopped = removes
      .map((cell) => game.overlay[`${cell.x},${cell.y}`])
      .filter(notUndefined)
      .filter((o) => o.isBubble).length
    return p + overlaysPopped
  }, 0)

  if (count > 0) {
    return {
      bubble: count,
    }
  } else {
    return {}
  }
}
