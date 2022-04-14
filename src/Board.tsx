import { useState } from 'react'
import './Board.scss'
import { BoardCell, NullBoardCell } from './BoardCell'
import { Cell, createGame, Game, tap } from './game'

export function Board() {
  const [game, setGame] = useState(() => createGame())
  const { columns } = game

  const click = (cell: Cell) => () => {
    setGame((oldGame: Game) => tap(oldGame, cell))
  }

  const style = {
    height: `calc(${game.size} * 42px)`,
  }

  return (
    <div className="Board" style={style}>
      {columns.map((column, i) => (
        <div className="Board_Column" key={i}>
          {column.map((cell, j) =>
            cell === null ? (
              <NullBoardCell key={`${i}_${j}`} />
            ) : (
              <BoardCell key={cell.id} cell={cell} onClick={click(cell)} />
            )
          )}
        </div>
      ))}
    </div>
  )
}
