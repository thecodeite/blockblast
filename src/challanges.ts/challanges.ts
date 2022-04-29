import { getSystemErrorMap } from 'util'
import { toRemove } from '../cellUtils'
import { Cell, Game } from '../types'

interface MakeChallangeProps {
  nextId: () => number
  name: string
  x: number
  y: number
}

export function makeChallange(props: MakeChallangeProps): Cell {
  const { name } = props
  if (name === 'beachball') {
    return makeBeachBall(props)
  } else if (name.startsWith('weight_')) {
    return makeWeight(props)
  } else if (name.startsWith('block')) {
    return makeBlock(props)
  } else if (name.startsWith('cage_')) {
    return makeCage(props)
  } else if (name === 'ice') {
    return makeIce(props)
  } else if (name.startsWith('cblock_')) {
    return makeColourBlock(props)
  } else {
    //return makeNull(props)
    throw new Error('Cant create challange:' + name)
  }
}

function makeBeachBall({ name, x, y, nextId }: MakeChallangeProps): Cell {
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
}

function makeWeight({ name, x, y, nextId }: MakeChallangeProps): Cell {
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
}

function makeBlock({ name, x, y, nextId }: MakeChallangeProps): Cell {
  return {
    id: nextId(),
    x,
    y,
    type: 'challange',
    variant: 'block',
    noGravity: true,
    meta: name.substring('block_'.length),

    onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
      if (cell.meta && cell.meta.length > 0) {
        return {
          ...cell,
          meta: cell.meta.substring(1),
        }
      }
      return toRemove(cell)
    },

    onDestroy(cell: Cell) {
      if (cell.meta && cell.meta.length > 0) {
        return {
          ...cell,
          meta: cell.meta.substring(1),
        }
      }
      return toRemove(cell, true)
    },
  } as Cell
}

function makeCage(props: MakeChallangeProps): Cell {
  const { name, x, y, nextId } = props
  return {
    id: nextId(),
    x,
    y,
    type: 'challange',
    variant: 'cage',
    noGravity: true,

    child: makeChallange({
      ...props,
      name: name.substring('cage_'.length),
    }),

    onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
      return cell.child
    },
    onDestroy: (cell: Cell) => {
      return cell.child
    },
  } as Cell
}
function makeIce(props: MakeChallangeProps): Cell {
  const { name, x, y, nextId } = props
  return {
    id: nextId(),
    x,
    y,
    type: 'challange',
    variant: 'ice',
    noGravity: true,

    onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
      return toRemove(cell)
    },
  } as Cell
}
function makeColourBlock(props: MakeChallangeProps): Cell {
  const { name, x, y, nextId } = props
  return {
    id: nextId(),
    x,
    y,
    type: 'challange',
    variant: 'cblock',
    meta: name.substring('cblock_'.length),
    noGravity: true,

    onNeighbourPop: (game: Game, cell: Cell, neighbour: Cell) => {
      if (neighbour.variant === cell.meta) {
        return toRemove(cell)
      } else {
        return cell
      }
    },
  } as Cell
}

function makeNull({ name, x, y, nextId }: MakeChallangeProps): Cell {
  return {
    type: 'null',
    id: nextId(),
    variant: 'null',
    x,
    y,
  }
}
