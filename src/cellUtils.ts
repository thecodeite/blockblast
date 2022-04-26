import { Cell, CellSpace, RemoveCell, TapCell } from './types'

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
