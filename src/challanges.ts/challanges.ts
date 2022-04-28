import { toRemove } from '../cellUtils'
import { Cell, Game } from '../types'

export function makeChallange(
  name: string,
  nextId: () => number,
  x: number,
  y: number
): Cell {
  if (name === 'beachball') {
    const cell: Cell = {
      id: nextId(),
      x,
      y,
      type: 'challange',
      variant: 'beachball',

      onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
        return toRemove(cell)
      },
    }

    return cell
  } else if (name.startsWith('weight_')) {
    const cell: Cell = {
      id: nextId(),
      x,
      y,
      type: 'challange',
      variant: name,

      // Indestructable
      onDestroy: (cell: Cell) => {
        console.log(`Try to destroy`, cell)
        return cell
      },

      onTick: (game: Game, cell: Cell) => {
        const { x, y } = cell
        const bottomOffset = game.colStats[x].offsets[0]
        console.log(
          'y <= bottomOffset, y, bottomOffset:',
          y <= bottomOffset,
          y,
          bottomOffset
        )
        if (y <= bottomOffset)
          return {
            ...cell,
            original: cell,
            remove: true,
          }
        else return cell
      },
    }
    return cell
  } else if (name.startsWith('block_')) {
    return {
      id: nextId(),
      x,
      y,
      type: 'challange',
      variant: name,
      noGravity: true,

      onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
        return toRemove(cell)
      },
    } as Cell
  } else if (name.startsWith('cage_')) {
    return {
      id: nextId(),
      x,
      y,
      type: 'challange',
      variant: 'cage',
      noGravity: true,

      child: makeChallange(name.substring('cage_'.length), nextId, x, y),

      onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
        return cell.child
      },
      onDestroy: (cell: Cell) => {
        return cell.child
      },
    } as Cell
  } else {
    return {
      type: 'null',
      id: nextId(),
      variant: 'null',
      x,
      y,
    }
  }
}
