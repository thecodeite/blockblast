import { nextId } from './game.utils'
import { Cell, CellFilter, Scores } from './types'

export const toRemove = (cell: Cell, force?: true): Cell => {
  if (cell.type === 'colour' || force) {
    return { ...cell, remove: true }
  } else if (cell.type === 'challange') {
    if (cell.onDestroy) {
      const after = cell.onDestroy(cell)
      return after
    } else {
      return { ...cell, remove: true }
    }
  } else if (cell.type === 'toy') {
    return { ...cell, tap: true }
  } else if (cell.type === 'null') {
    return cell
  } else {
    throw new Error('Unexpected type: ' + cell.type)
  }
}

export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}
export function notUndefinedOrNull<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null
}

export function removeCell(cellToRemove: Cell): CellFilter {
  return (column: Cell[]) =>
    column.map((cell) =>
      cell && cellToRemove.id === cell.id ? toRemove(cell, true) : cell
    )
}

export function removeCells(cellsToRemove: Cell[]): CellFilter {
  const ids = cellsToRemove.map((cell) => cell.id)
  return (column) =>
    column.map((cell) =>
      cell && ids.includes(cell.id) ? toRemove(cell, true) : cell
    )
}

export function isCell(cellSpace: Cell): cellSpace is Cell {
  return !!cellSpace
}

export function doRemove(column: Cell[]): Cell[] {
  return column.map((cell) =>
    cell?.remove
      ? {
          type: 'null',
          variant: 'null',
          x: cell.x,
          y: cell.y,
          id: nextId(),
        }
      : cell
  )
}

export function calcScore(column: Cell[][]): Scores {
  const totals = column.flat().reduce((score, cell) => {
    if (cell?.remove === true) {
      return {
        ...score,
        [cell.variant]: (score[cell.variant] || 0) + 1,
      }
    }
    return score
  }, {} as Scores)

  return totals
}
