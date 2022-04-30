import { useMemo, useState } from 'react'

import './Board.scss'
import { BoardCell, NullBoardCell } from './cells/BoardCell'
import { tap } from './game'
import { Cell, Game, Overlay } from './types'

interface BoardArgs {
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game>>
}

export function Board({ game, setGame }: BoardArgs) {
  const { columns } = game
  const [debug, setDebug] = useState<any>()

  const click = (cell: Cell) => () => {
    const nextGame = tap(game, cell)
    setGame(nextGame)
  }

  const style = {
    height: `calc(${game.levelDef.height} * 42px)`,
  }

  const overlayAt: (cell: Cell) => Overlay | undefined = (cell: Cell) => {
    const overlay = game.overlay[`${cell.x},${cell.y}`]
    return overlay
  }

  const backgroundStyles = useMemo(() => {
    const background = Array.from({ length: game.levelDef.width }).map(
      (_, x) => {
        const isIn = game.colStats[x].offsets.slice(0, game.colStats[x].length)
        return Array.from({ length: game.levelDef.height }, (_, y) =>
          isIn.includes(y) ? 1 : 0
        ).reverse()
      }
    )
    const neighbours = [
      [0, 0],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ]
    const bg = background.map((col, x) =>
      col.map((cell, y) => {
        return neighbours.map(([dx, dy]) => background?.[x + dx]?.[y + dy])
      })
    )

    const bgs = bg.map((col) => col.map(calcStyle))
    // console.log(background.map((c) => c.join('')).join('\n'))

    function calcStyle(b: (0 | 1)[]): React.CSSProperties {
      if (b[0] === 1)
        return {
          visibility: 'hidden',
        }
      return {
        borderColor: 'black',
        borderWidth: 1,
        borderTopLeftRadius: b[1] && b[2] && b[8] ? 8 : 0,
        borderLeftStyle: b[2] ? 'solid' : 'none',
        borderBottomLeftRadius: b[3] && b[2] && b[4] ? 8 : 0,
        borderBottomStyle: b[4] ? 'solid' : 'none',
        borderBottomRightRadius: b[5] && b[4] && b[6] ? 8 : 0,
        borderRightStyle: b[6] ? 'solid' : 'none',
        borderTopRightRadius: b[7] && b[6] && b[8] ? 8 : 0,
        borderTopStyle: b[8] ? 'solid' : 'none',

        backgroundColor: 'rgba(218, 165, 32, 0.324)',
      }
    }

    return bgs
  }, [game.levelDef, game.colStats])

  return (
    <div className="Board" style={style}>
      <div className="Board_Background">
        {backgroundStyles.map((coll, x) => (
          <div key={x} className="Board_BackgroundColumn">
            {coll.map((style, y) => (
              <div key={y} className="Board_BackgroundCell" style={style}></div>
            ))}
          </div>
        ))}
      </div>
      {columns.map((column, i) => (
        <div className="Board_Column" key={i}>
          {column.map((cell, j) =>
            cell === null ? (
              <NullBoardCell key={`null_${i}_${j}`} />
            ) : (
              <BoardCell
                key={`cell_${cell.id}`}
                cell={cell}
                overlay={overlayAt(cell)}
                game={game}
                onClick={click(cell)}
                onMouseOver={() => setDebug(cell)}
              />
            )
          )}
        </div>
      ))}
      <pre>{JSON.stringify(debug, null, '  ')}</pre>
    </div>
  )
}
