// import 'core-js/actual/array/group-by'
import {
  calcScore,
  doRemove,
  notUndefined,
  notUndefinedOrNull,
  toRemove,
} from './cellUtils'
import { makeChallange } from './challanges.ts/challanges'
import { tapFirstToy, tapToy } from './game.tapToy'
import {
  addAndFall,
  applyPopEffect,
  applyScore,
  calcOverlayScore,
  cardinalNeighbourIds,
  createGames2,
  findNeighbours,
  mergeScores,
  nextId,
} from './game.utils'
import level0 from './levels/level0'
import levels from './levels/levels'
import { Prng } from './Prng'
import { Cell, Game, LevelDef, Overlay, Scores } from './types'

export type CreateCellFunc = (ch: string, x: number, y: number) => Cell

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

export function createOffsets(str: string): number[] {
  let bottom = 0
  while (str[str.length - bottom - 1] === '_') {
    bottom++
  }
  const strArr = str.split('')
  const nonSpace = strArr.filter((x) => x !== '_')
  const arr = strArr.reverse().slice(bottom)

  const offsets = [...arr, ...nonSpace]
    .map((str, i) => {
      return str !== '_' ? bottom + i : undefined
    })
    .filter(notUndefined)

  return offsets
}

function createOverlay(levelDef: LevelDef): { [key: string]: Overlay } {
  // overlayMap

  if (levelDef.overlay) {
    const { overlay } = levelDef
    const stringOverlay = Array.from({ length: levelDef.width }, (_, x) => {
      return overlay.reduce((p, c) => p + c[x], '')
    })

    const overlayEntries = stringOverlay
      .map((str, x) => {
        return str
          .split('')
          .reverse()
          .map((ch, y) => {
            return {
              x,
              y,
              isBubble: ch === '0',
            } as Overlay
          })
      })
      .flat()
      .map((o) => [`${o.x},${o.y}`, o])
    return Object.fromEntries(overlayEntries) as {
      [key: string]: Overlay
    }
  } else if (levelDef.overlayMap) {
    const { overlayMap } = levelDef
    const stringOverlay = Array.from({ length: levelDef.width }, (_, x) => {
      return levelDef.initial.reduce((p, c) => p + c[x], '')
    })

    const overlayEntries = stringOverlay
      .map((str, x) => {
        return str
          .split('')
          .reverse()
          .map((ch, y) => {
            return {
              x,
              y,
              isBubble: overlayMap[ch] === 'bubble',
            } as Overlay
          })
      })
      .flat()
      .map((o) => [`${o.x},${o.y}`, o])
    return Object.fromEntries(overlayEntries) as {
      [key: string]: Overlay
    }
  } else {
    return {}
  }
}

export function createGame(levelString: string): Game {
  const levelDef: LevelDef = levels[levelString] || level0

  const prng = new Prng('test')

  const stringCols = Array.from({ length: levelDef.width }, (_, x) => {
    return levelDef.initial.reduce((p, c) => p + c[x], '')
  })

  const colStats = stringCols.map((str) => {
    const offsets = createOffsets(str)
    return {
      length: offsets.length / 2,
      offsets,
    }
  })

  const columns: Cell[][] = stringCols.map((str, x) => {
    const colStat = colStats[x]
    return str
      .split('')
      .filter((str) => str !== '_')
      .reverse()
      .map((ch, yIndex) => {
        const y = colStat.offsets[yIndex]
        if (levelDef.challanges?.[ch]) {
          return makeChallange({ name: levelDef.challanges[ch], nextId, x, y })
        } else if (colourSymbols[ch]) {
          return {
            type: 'colour',
            id: nextId(),
            x,
            y,
            variant: colourSymbols[ch],
          }
        } else if (levelDef.toySymbols?.[ch]) {
          return {
            type: 'toy',
            id: nextId(),
            x,
            y,
            variant: levelDef.toySymbols[ch],
          }
        } else if (ch === '.') {
          return {
            type: 'colour',
            id: nextId(),
            x,
            y,
            variant: prng.nextOf(levelDef.colours),
          }
        } else if (ch === ' ') {
          return {
            type: 'null',
            id: nextId(),
            x,
            y,
            variant: 'null',
          }
        } else {
          // return {
          //   type: 'null',
          //   id: nextId(),
          //   x,
          //   y,
          //   variant: 'null',
          // }
          throw new Error('Undefined char:' + ch)
        }
      })
  })

  const overlay = createOverlay(levelDef)

  const game: Game = {
    id: 0,
    levelString,
    prng,
    levelDef,
    colStats,
    columns,
    overlay,
    currentScore: { ...levelDef.win },
    movesLeft: levelDef.moves,
    spawnLeft: { ...levelDef.spawn },
  }

  return countNeigbours(game)
}

export function tap(game: Game, on: Cell): Game {
  let headGame = game
  if (game.activeBooster) {
    headGame = tapWithBooster(game.activeBooster, headGame, on)
  } else if (on.type !== 'colour' && on.type !== 'toy') {
    return game
  } else {
    headGame = { ...headGame, movesLeft: game.movesLeft - 1 }
    headGame =
      on.type === 'colour' ? tapColour(headGame, on) : tapFirstToy(headGame, on)
  }

  headGame = doTick(headGame)

  if (!game.activeBooster && headGame.currentScore['ice'] > 0) {
    if (headGame.currentScore['ice'] === game.currentScore['ice']) {
      headGame = addSomeIce(headGame)
    }
  }

  const hasWon = Object.entries(headGame.currentScore).reduce(
    (won, [_, count]) => won && count === 0,
    true
  )
  console.log('hasWon:', hasWon)
  if (hasWon) {
    headGame = {
      ...headGame,
      hasWon: true,
    }
  } else {
    headGame = countNeigbours(headGame)
  }

  return headGame
}

export function tapWithBooster(booster: string, game: Game, on: Cell): Game {
  let withRemove = game.columns
  if (booster === 'drill') {
    if (on.type === 'toy') {
      return game
    }
    withRemove = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.id !== on.id) {
          return cell
        } else {
          return toRemove(cell)
        }
      })
    )
  } else if (booster === 'train') {
    withRemove = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.y !== on.y) {
          return cell
        } else {
          return toRemove(cell)
        }
      })
    )
  } else if (booster === 'hover') {
    withRemove = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.y > game.levelDef.height || cell.x !== on.x) {
          return cell
        } else {
          return toRemove(cell)
        }
      })
    )
  } else if (booster === 'bucket') {
    if (on.type !== 'colour') {
      return game
    }
    const removeColour = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.y > game.levelDef.height || cell.variant !== on.variant) {
          return cell
        } else {
          return toRemove(cell)
        }
      })
    )
    withRemove = applyPopEffect(
      game,
      removeColour,
      removeColour
        .flat()
        .filter((cell) => cell?.remove)
        .filter(notUndefinedOrNull)
    )
  } else if (booster.startsWith('paint:')) {
    const colour = booster.substring('paint:'.length)
    withRemove = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.id !== on.id) {
          return cell
        } else {
          return {
            ...cell,
            variant: colour,
          }
        }
      })
    )
  }

  const toysToTap: Cell[] = withRemove
    .flat()
    .map((cell) => {
      if (cell?.tap === true) {
        return {
          ...cell,
          tap: undefined,
        } as Cell
      }
      return undefined
    })
    .filter(notUndefined)

  const popScoreChange = calcScore(withRemove)
  const overlayScoreChange = calcOverlayScore(game, withRemove)
  const withNull = withRemove.map(doRemove)
  let scoreChange = mergeScores([popScoreChange, overlayScoreChange])

  //const moves = [withRemove, withNull]
  const gameWithRemoveAndNull = createGames2(
    [withRemove, withNull],
    applyScore(game, scoreChange)
  )

  // const withToyMoves = toysToTap.reduce((p, toy) => {
  //   const res = tapToy(game, p[p.length - 1], toy, false)
  //   scoreChange = mergeScores([scoreChange, ...res.map((r) => r.scores)])
  //   return [...p, ...res.map((r) => r.colls)]
  // }, moves)

  const withToyMoves = toysToTap.reduce((currentGame, toy) => {
    return tapToy(currentGame, toy, false)
  }, gameWithRemoveAndNull)

  // const [withAdd, withFall] = addAndFall(
  //   game,
  //   withToyMoves[withToyMoves.length - 1]
  // )
  //.map(addNewCells(game))

  return {
    ...addAndFall(withToyMoves),
    activeBooster: undefined,
  }

  //const gameWithScore = applyScore(game, scoreChange)

  // return createGames2([...withToyMoves, withAdd, withFall], {
  //   ...gameWithScore,
  //   activeBooster: undefined,
  // })
}

function addSomeIce(game: Game): Game {
  const allCells = game.columns.flat()
  const iceCubes = allCells.filter((c) => c.variant === 'ice')
  const viableNeibours = iceCubes
    .flatMap((cube) => {
      const cardinalNeighbours = cardinalNeighbourIds.map(([x, y]) =>
        allCells.find(
          (c) =>
            cube.y + y < game.levelDef.height &&
            c.x === cube.x + x &&
            c.y === cube.y + y &&
            (c.type === 'colour' || c.type === 'null')
        )
      )
      return cardinalNeighbours
    })
    .filter(notUndefined)
  if (viableNeibours.length > 0) {
    const toIce = game.prng.nextOf(viableNeibours)
    const columns = game.columns.map((col) =>
      col.map((cell) => {
        if (cell.id === toIce.id) {
          return makeChallange({
            name: 'ice',
            x: cell.x,
            y: cell.y,
            nextId: () => cell.id,
          })
        } else {
          return cell
        }
      })
    )
    return {
      ...game,
      id: nextId(),
      currentScore: {
        ...game.currentScore,
        ice: iceCubes.length + 1,
      },
      columns,
      previousGame: game,
    }
  } else {
    return game
  }
}

function countNeigbours(game: Game): Game {
  let columns = game.columns.map((column) =>
    column.map((cell) => {
      if (cell.type !== 'colour' || cell.y >= game.levelDef.height) return cell
      const neighbours = findNeighbours(cell, game.columns, game.levelDef)
      return {
        ...cell,
        neighbours: neighbours.size,
      }
    })
  )
  const cells = columns
    .flat()
    .filter((cell) => cell.type === 'colour' && cell.y < game.levelDef.height)
  const grouped = cells.filter((c) => c.neighbours && c.neighbours > 1)
  if (grouped.length === 0) {
    const totals = cells.reduce((acc, cell) => {
      if (cell.type === 'colour') {
        return {
          ...acc,
          [cell.variant]: (acc[cell.variant] || 0) + 1,
        }
      }
      return acc
    }, {} as Scores)
    console.log('totals:', totals)
    const groups = groupCells(cells.filter((c) => c.type === 'colour')).sort(
      (a, b) => b.length - a.length
    )
    console.log('groups:', groups)
    const idMapEntries = groups.flatMap((group) => {
      const sortedColours = Object.entries(totals).sort(
        ([_, a], [__, b]) => b - a
      )
      console.log('sortedColours:', sortedColours)
      const colour = sortedColours[0][0]
      totals[colour] -= group.length
      return group.map((cell) => {
        return [cell.id, colour]
      })
    })
    console.log('totals:', totals)
    const idMap = Object.fromEntries(idMapEntries)
    console.log('idMap:', idMap)
    const columnsMapped = game.columns.map((column) =>
      column.map((cell) => {
        const mapColour = idMap[cell.id]
        if (!mapColour) {
          return cell
        } else {
          return {
            ...cell,
            variant: mapColour,
          }
        }
      })
    )
    return {
      ...game,
      id: nextId(),
      columns: columnsMapped,
      previousGame: game,
    }
  }

  return {
    ...game,
    id: nextId(),
    columns,
    previousGame: game,
  }
}

function groupCells(cells: Cell[]) {
  const groups: Cell[][] = []

  cells.forEach((cell) => {
    const adjacent = groups.filter((group) => {
      return group.some((groupCell) => areAdjacent(cell, groupCell))
    })
    if (adjacent.length === 0) {
      groups.push([cell])
    } else if (adjacent.length === 1) {
      adjacent[0].push(cell)
    } else throw new Error('not implemented')
  })

  return groups
}

function areAdjacent(cell1: Cell, cell2: Cell) {
  return (
    (cell1.x === cell2.x && Math.abs(cell1.y - cell2.y) === 1) ||
    (cell1.y === cell2.y && Math.abs(cell1.x - cell2.x) === 1)
  )
}

function doTick(game: Game): Game {
  let changed = false

  const withRemove = game.columns.map((column) =>
    column.map((cell) => {
      if (cell?.onTick) {
        const nextCell = cell.onTick(game, cell)
        console.log('nextCell, cell:', nextCell, cell)
        if (nextCell !== cell) {
          changed = true
        }
        return nextCell
      } else {
        return cell
      }
    })
  )

  if (!changed) return game

  const scoreChange = calcScore(withRemove)
  const gameWithScore = applyScore(game, scoreChange)

  const withNull = withRemove.map(doRemove)

  const gamesWithNullAndRemove = createGames2(
    [withRemove, withNull],
    gameWithScore
  )

  const gameWithAddAndFall = addAndFall(gamesWithNullAndRemove)

  return doTick(gameWithAddAndFall)
}

export function tapColour(game: Game, on: Cell): Game {
  const neighbours = findNeighbours(on, game.columns, game.levelDef)
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
      id: nextId(),
      x: on.x,
      y: on.y,
      variant,
    }
  }

  const addToyAt = (column: Cell[], x: number): Cell[] => {
    if (toy === undefined) return column
    const t = toy
    const cols = column.map((cell) => (t.x === x && t.y === cell.y ? t : cell))
    return cols
  }

  const withPopEffect = applyPopEffect(game, game.columns, [...neighbours])

  const neighboursIds = [...neighbours].map((x) => x.id)

  const removeNeighbours = (cell: Cell) =>
    cell && neighboursIds.includes(cell.id) ? toRemove(cell) : cell
  const withRemove = withPopEffect.map((column) => column.map(removeNeighbours))

  const popScoreChange = calcScore(withRemove)
  const overlayScoreChange = calcOverlayScore(game, withRemove)
  const scoreChange = mergeScores([popScoreChange, overlayScoreChange])

  const gameWithScore = applyScore(game, scoreChange)

  const withNull = withRemove.map(doRemove)
  const withToy = withNull.map(addToyAt)

  const res = createGames2(
    [withPopEffect, withRemove, withNull, withToy],
    gameWithScore
  )

  return addAndFall(res)

  // const [withAdd, withFall] = addAndFall(game, withToy)
  // //withToy.map(doFall(game)) //.map(addNewCells(game))

  // console.log('res:', res)
  // return res
}
