import { useEffect, useState } from 'react'

import './Board.scss'
import { BoardCell, NullBoardCell } from './BoardCell'
import { tap } from './game'
import { Prng } from './Prng'
import { Cell, Game } from './types'

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
