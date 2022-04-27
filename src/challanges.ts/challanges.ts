import { toRemove } from '../cellUtils'
import { Cell, Game } from '../types'

export function makeChallange(
  name: string,
  id: number,
  x: number,
  y: number
): Cell {
  if (name === 'beachball') {
    const cell: Cell = {
      id,
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
      id,
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
      id,
      x,
      y,
      type: 'challange',
      variant: name,
      noGravity: true,

      onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
        return toRemove(cell)
      },
    } as Cell
  } else {
    return {
      type: 'null',
      id,
      variant: 'null',
      x,
      y,
    }
  }
}
