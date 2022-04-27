import {
  calcScore,
  doRemove,
  notUndefined,
  notUndefinedOrNull,
  removeCell,
  removeCells,
  toRemove,
} from './cellUtils'
import {
  addNewCells,
  applyPopEffect,
  applyScore,
  calcOverlayScore,
  createGames,
  doFall,
  findNeighbours,
  mergeScores,
  nextId,
} from './game.utils'
import { Cell, CellFilter, Game, TapStep } from './types'

function doMulti(
  game: Game,
  neighboursSet: Set<Cell>,
  columns: Cell[][],
  makeToy: (cell: Cell) => Cell
) {
  const neighbours = [...neighboursSet]
  const cube = neighbours.find((cell) => cell.variant.startsWith('cube'))
  if (!cube) return []
  const colour = cube.variant.substring('cube_'.length)

  const matches = columns
    .flatMap((cells) =>
      cells.filter(
        (cell) => cell?.variant === colour && cell.y < game.levelDef.height
      )
    )
    .filter(notUndefinedOrNull)

  const steps: TapStep[] = []
  let colls = columns
  const toys = matches
    .map((colourCell) => {
      let toy = makeToy(colourCell)

      const nextSet = colls.map((cells) =>
        cells.map((cell) => (cell?.id === colourCell.id ? toy : cell))
      )
      steps.push({ colls: nextSet, scores: { [colour]: 1 } })
      colls = nextSet
      return toy as undefined | Cell
    })
    .filter(notUndefined)
    .reverse()

  const withRemove = colls.map(removeCells(neighbours)).map(doRemove)

  steps.push({ colls: withRemove, scores: {} })

  toys.forEach((toy) => {
    const step = steps[steps.length - 1]
    colls = step.colls
    const cells = colls.flat()
    const currentToy = cells.find((cell) => cell && cell.id === toy.id)

    if (currentToy) {
      const moves = tapToy(game, colls, currentToy, false)
      steps.push(...moves)
    }
  })
  colls = steps[steps.length - 1].colls
  const withFall = colls.map(doFall(game)).map(addNewCells(game))
  steps.push({ colls: withFall, scores: {} })

  return steps
}

function tapToy(
  game: Game,
  columns: Cell[][],
  onOrig: Cell,
  isHuman: boolean
): TapStep[] {
  if (onOrig.tap) return []

  const on = columns.flat().find((cell) => cell.id === onOrig.id)
  if (!on) return []

  let variant = on.variant
  const neighbours = isHuman
    ? findNeighbours(on, columns, game.levelDef)
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
  let doPop = false

  if (variant === 'rotorH') {
    filter = (column) =>
      column.map((cell) => (on.y === cell?.y ? toRemove(cell) : cell))
  } else if (variant === 'rotorV') {
    filter = (column) =>
      column.map((cell) =>
        on.x === cell?.x && cell.y < game.levelDef.height
          ? toRemove(cell)
          : cell
      )
  } else if (variant === 'cross') {
    filter = (column) =>
      column.map((cell) =>
        cell.y < game.levelDef.height && (on.x === cell.x || on.y === cell.y)
          ? toRemove(cell)
          : cell
      )
  } else if (variant === 'wide_rotors') {
    const near = (x: number, y: number) => {
      const dx = on.x - x
      const dy = on.y - y
      return Math.abs(dx) <= 1 || Math.abs(dy) <= 1
    }
    filter = (column) =>
      column.map((cell) => (near(cell.x, cell.y) ? toRemove(cell) : cell))
  } else if (variant === 'bomb' || variant === 'mega_bomb') {
    const size = variant === 'bomb' ? 1 : 3
    const near = (x: number, y: number) => {
      const dx = on.x - x
      const dy = on.y - y
      return Math.abs(dx) <= size && Math.abs(dy) <= size
    }
    filter = (column) =>
      column.map((cell) => (near(cell.x, cell.y) ? toRemove(cell) : cell))
  } else if (variant.startsWith('cube_')) {
    const burnColour = on.variant.substring('cube_'.length)

    filter = (column) =>
      column.map((cell) =>
        cell === on ||
        (cell.y < game.levelDef.height && cell?.variant === burnColour)
          ? toRemove(cell)
          : cell
      )
    doPop = true
  } else if (variant === 'nuke') {
    filter = (column) =>
      column.map((cell) =>
        cell.y < game.levelDef.height ? toRemove(cell) : cell
      )
  } else if (variant === 'multi_rotors') {
    const makeRotor = (cell: Cell) =>
      ({
        ...cell,
        type: 'toy',
        variant: game.prng.nextOf(['rotorH', 'rotorV']),
        id: nextId(),
      } as Cell)

    return doMulti(game, neighbours, columns, makeRotor)
  } else if (variant === 'multi_bombs') {
    const makeBomb = (cell: Cell) =>
      ({
        ...cell,
        type: 'toy',
        variant: 'bomb',
        id: nextId(),
      } as Cell)

    return doMulti(game, neighbours, columns, makeBomb)
  } else {
    return []
  }
  const withTappedRemoved = columns.map(removeCells([...neighbours]))
  const withTappedNulled = withTappedRemoved.map(doRemove)

  const withToyActivated = withTappedNulled.map(filter)

  let withPopEffect = undefined
  if (doPop) {
    withPopEffect = applyPopEffect(
      game,
      withToyActivated,
      withToyActivated
        .flat()
        .filter((cell) => cell?.remove)
        .filter(notUndefinedOrNull)
    )
  }

  const withTapped = (withPopEffect || withToyActivated).map(removeCell(on))

  const toysToTap: Cell[] = withTapped
    .flatMap((col) =>
      col.map((cell) => {
        if (cell?.tap === true) {
          return {
            ...cell,
            tap: undefined,
          } as Cell
        }
        return undefined
      })
    )
    .filter(notUndefined)
  console.log('toysToTap:', toysToTap)

  const popScoreChange = calcScore(withTapped)
  const overlayScoreChange = calcOverlayScore(
    game,
    withTappedRemoved,
    withTapped
  )
  const scoreChange = mergeScores([popScoreChange, overlayScoreChange])
  const withNull = withTapped.map(doRemove)

  const moves: TapStep[] = [
    { colls: withTappedRemoved, scores: {} },
    { colls: withToyActivated, scores: scoreChange },
    withPopEffect ? { colls: withPopEffect, scores: {} } : undefined,
    { colls: withNull, scores: {} },
  ].filter(notUndefined)

  if (toysToTap.length > 0) {
    console.log('toysToTap:', toysToTap.length)
    return toysToTap.reduce((p, toy) => {
      const res = tapToy(game, p[p.length - 1].colls, toy, false)
      return [...p, ...res]
    }, moves)
  }
  return moves
}

export function tapFirstToy(game: Game, on: Cell): Game {
  const steps = tapToy(game, game.columns, on, true)

  const scoresList = steps.map((step) => step.scores)
  const moves = steps.map((step) => step.colls)

  const last = steps[steps.length - 1]
  console.log('steps:', steps)
  const withFall = last.colls.map(doFall(game)).map(addNewCells(game))

  const scoreChange = mergeScores(scoresList)

  const gameWithScore = applyScore(game, scoreChange)

  return createGames([...moves, withFall], gameWithScore)
}
