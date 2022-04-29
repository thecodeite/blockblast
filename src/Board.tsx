import { useEffect, useState } from 'react'

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

  return (
    <div className="Board" style={style}>
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
