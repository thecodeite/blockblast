// import 'core-js/actual/array/group-by'
import {
  calcScore,
  doRemove,
  isCell,
  notUndefined,
  notUndefinedOrNull,
  toRemove,
} from './cellUtils'
import { makeChallange } from './challanges.ts/challanges'
import { tapFirstToy } from './game.tapToy'
import {
  addNewCells,
  applyPopEffect,
  applyScore,
  cardinalNeighbourIds,
  createGames,
  doFall,
  findNeighbours,
  nextId,
} from './game.utils'
import level0 from './levels/level0'
import levels from './levels/levels'
import { Prng } from './Prng'
import {
  Cell,
  CellFilter,
  CellSpace,
  Game,
  LevelDef,
  RemoveCell,
  Scores,
  TapCell,
} from './types'

export function pivotArray(initial: string[], width: number): string[][] {
  const stringCols = Array.from({ length: width }, (_, x) => {
    return initial.reduce((p, c) => [...p, c[x]], [] as string[])
  })

  return stringCols
}

export type CreateCellFunc = (ch: string, x: number, y: number) => Cell | null

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

  const columns: CellSpace[][] = stringCols.map((str, x) => {
    const colStat = colStats[x]
    return str
      .split('')
      .filter((str) => str !== '_')
      .reverse()
      .map((ch, yIndex) => {
        const y = colStat.offsets[yIndex]
        if (levelDef.challanges?.[ch]) {
          return makeChallange(levelDef.challanges[ch], nextId(), x, y)
        } else if (colourSymbols[ch]) {
          return {
            type: 'colour',
            id: nextId(),
            x,
            y,
            variant: colourSymbols[ch],
          }
        } else if (toySymbols[ch]) {
          return {
            type: 'toy',
            id: nextId(),
            x,
            y,
            variant: toySymbols[ch],
          }
        } else {
          return {
            type: 'colour',
            id: nextId(),
            x,
            y,
            variant: prng.nextOf(levelDef.colours),
          }
        }
      })
  })

  const game: Game = {
    levelString,
    prng,
    levelDef,
    colStats,
    columns,
    currentScore: { ...levelDef.win },
    movesLeft: levelDef.moves,
  }

  const withNewCells = columns.map(addNewCells(game))

  return {
    ...game,
    columns: withNewCells,
  }
}

export function tap(game: Game, on: Cell): Game {
  const afterTap =
    on.type === 'colour' ? tapColour(game, on) : tapFirstToy(game, on)

  let lastGame = afterTap
  while (lastGame.nextGame) {
    lastGame = lastGame.nextGame
  }

  lastGame.nextGame = doTick(lastGame)

  const endState = lastGame.nextGame || lastGame

  const hasWon = Object.entries(endState.currentScore).reduce(
    (won, [_, count]) => won && count === 0,
    true
  )
  console.log('hasWon:', hasWon)
  if (hasWon) {
    endState.hasWon = hasWon
  }

  return afterTap
}

function doTick(game: Game): Game | undefined {
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

  if (!changed) return undefined

  const scoreChange = calcScore(withRemove)
  const gameWithScore = applyScore(game, scoreChange)

  const withNull = withRemove.map(doRemove)
  const withFall = withNull.map(doFall(game)).map(addNewCells(game))

  return createGames([withRemove, withNull, withFall], gameWithScore)
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
      id: nextId(),
      x: on.x,
      y: on.y,
      variant,
    }
  }

  const addToyAt = (column: CellSpace[], x: number): CellSpace[] => {
    if (toy === undefined) return column
    const t = toy
    const cols = column.map((cell, y) => (t.x === x && t.y === y ? t : cell))
    return cols
  }

  const withPopEffect = applyPopEffect(game, game.columns, [...neighbours])

  const neighboursIds = [...neighbours].map((x) => x.id)

  const removeNeighbours = (cell: CellSpace) =>
    cell && neighboursIds.includes(cell.id) ? toRemove(cell) : cell
  const withRemove = withPopEffect.map((column) => column.map(removeNeighbours))

  const scoreChange = calcScore(withRemove)
  const gameWithScore = applyScore(game, scoreChange)

  const withNull = withRemove.map(doRemove)
  const withToy = withNull.map(addToyAt)
  const withFall = withToy.map(doFall(game)).map(addNewCells(game))

  return createGames(
    [withPopEffect, withRemove, withNull, withToy, withFall],
    gameWithScore
  )
}
