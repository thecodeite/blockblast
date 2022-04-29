import { isCell, notUndefined, notUndefinedOrNull, toRemove } from './cellUtils'
import { makeChallange } from './challanges.ts/challanges'
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
  spawnLeft: { [key: string]: number } | undefined,
  num: number,
  x: number,
  yStart: number
): [Cell[], { [key: string]: number } | undefined] {
  let spawn = spawnLeft
  const column = Array.from({ length: num }, (_, yIndex) => {
    const y = colStats[x].offsets[yStart + yIndex]

    if (spawn && Object.keys(spawn).length > 0) {
      const spawnSet = Object.entries(spawn)
      const [variant, num] = spawnSet[0]

      spawn = { ...spawn }
      if (num > 1) {
        spawn[variant]--
      } else {
        delete spawn[variant]
        if (Object.keys(spawn).length === 0) {
          spawn = undefined
        }
      }

      return makeChallange({ nextId, name: variant, x, y })
    }

    return {
      type: 'colour',
      id: nextId(),
      x,
      y,
      variant: prng.nextOf(colours),
    } as Cell
  })

  return [column, spawn]
}

// export function doFall(game: Game) {
//   const { colStats } = game
//   return (column: Cell[], x: number): Cell[] => {
//     const firstNoGravity =
//       [...column].reverse().find((c) => c.noGravity)?.y || -1

//     return column
//       .filter((c) => c.type !== 'null' || c.y < firstNoGravity)
//       .map((cell, yIndex) => {
//         const colStat = colStats[x]
//         const y = colStat.offsets[yIndex]

//         return {
//           ...cell,
//           y,
//         }
//       })
//   }
// }

// export function addAndFall2(game: Game): Game {
//   const [a, b] = addAndFall(game, game.columns)

//   return createGames2([a, b], game)
// }

export function addAndFall(game: Game): Game {
  const { colStats } = game
  let spawnLeft = game.spawnLeft
  const sets = game.columns.map((column: Cell[], x: number) => {
    const firstNoGravity =
      [...column].reverse().find((c) => c.noGravity)?.y || -1

    const fall = column.filter((c) => c.type !== 'null' || c.y < firstNoGravity)

    const missing = colStats[x].length - fall.length

    let withAdd = [...column]
    if (missing > 0) {
      const [missingCells, spawn] = createColumn(
        game,
        spawnLeft,
        missing,
        x,
        colStats[x].length
      )
      spawnLeft = spawn
      withAdd = [...column, ...missingCells]
    }

    let withFall = withAdd
      .filter((c) => c.type !== 'null' || c.y < firstNoGravity)
      .map((cell, yIndex) => {
        const colStat = colStats[x]
        const y = colStat.offsets[yIndex]

        return {
          ...cell,
          y,
        }
      })

    if (firstNoGravity !== -1) {
      const fngIndex =
        firstNoGravity - (game.levelDef.height - colStats[x].length)
      for (let yEnd = fngIndex - 1; yEnd > 0; yEnd--) {
        for (let y = 0; y < yEnd; y++) {
          if (withFall[y].type === 'null' && !withFall[y + 1].noGravity) {
            const tmp = withFall[y + 1]
            withFall[y + 1] = withFall[y]
            withFall[y] = tmp

            const tmpY = withFall[y + 1].y
            withFall[y + 1].y = withFall[y].y
            withFall[y].y = tmpY
          }
        }
      }
    }

    return { a: withAdd, b: withFall }
  })

  const a = sets.map((x) => x.a)
  const b = sets.map((x) => x.b)
  return createGames2([a, b], {
    ...game,
    spawnLeft,
  })
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

// export function createGamesX(columnsList: Cell[][][], game: Game): Game {
//   const [columns, ...tail] = columnsList

//   const overlay = calcNewOverlay(game, columns)
//   const nextGame = {
//     ...game,
//     overlay,
//     columns,
//     nextGame:
//       tail.length === 0 ? undefined : createGamesX(tail, { ...game, overlay }),
//   }

//   return nextGame
// }

export function createGames2(columnsList: Cell[][][], game: Game): Game {
  return columnsList.reduce((previousGame, columns) => {
    const overlay = calcNewOverlay(previousGame, columns)
    return {
      ...previousGame,
      overlay,
      id: nextId(),
      columns,
      previousGame,
    } as Game
  }, game)
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
