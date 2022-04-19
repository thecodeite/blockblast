import { Cell, Game } from '../game'

export function makeChallange(
  name: string,
  id: number,
  x: number,
  y: number
): Cell | null {
  if (name.startsWith('weight_')) {
    const cell: Cell = {
      id,
      x,
      y,
      type: 'challange',
      variant: name,

      onTick: (game: Game, cell: Cell) => {
        const { x, y } = cell
        console.log('x,y:', x, y)
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
  } else {
    return null
  }
}
