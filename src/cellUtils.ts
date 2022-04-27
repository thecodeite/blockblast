import {
  Cell,
  CellFilter,
  CellSpace,
  RemoveCell,
  Scores,
  TapCell,
} from './types'

export const toRemove = (
  cell: CellSpace,
  force?: true
): Cell | null | RemoveCell | TapCell => {
  if (cell) {
    if (cell.type === 'colour' || force) {
      return { ...cell, original: cell, remove: true }
    } else if (cell.type === 'challange') {
      if (cell.onDestroy) {
        const after = cell.onDestroy(cell)
        return after
      } else {
        return { ...cell, original: cell, remove: true }
      }
    } else {
      return { ...cell, original: cell, tap: true }
    }
  } else {
    return null
  }
}

export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}
export function notUndefinedOrNull<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null
}

export function removeCell(cellToRemove: Cell): CellFilter {
  return (column: CellSpace[]) =>
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

export function isCell(cellSpace: CellSpace): cellSpace is Cell {
  return !!cellSpace
}

export function doRemove(column: CellSpace[]): CellSpace[] {
  return column.map((cell) => (cell?.remove ? null : cell))
}

export function calcScore(column: CellSpace[][]): Scores {
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
