import { useEffect } from 'react'
import { useState } from 'react'
import './Board.scss'
import { BoardCell, NullBoardCell } from './BoardCell'
import { Cell, createGame, Game, tap } from './game'
import level from './levels/level-bump'

export function Board() {
  const [game, setGame] = useState(() => createGame(level))
  const { columns } = game

  const click = (cell: Cell) => () => {
    setGame((oldGame: Game) => tap(oldGame, cell))
  }

  useEffect(() => {
    if (game.nextGame) {
      const nextGame = game.nextGame
      const h = setTimeout(() => {
        console.log(`tick`)
        setGame(nextGame)
      }, 10)
      return () => clearTimeout(h)
    } else {
      console.log(`done`)
    }
  }, [game])

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
                onClick={click(cell)}
              />
            )
          )}
        </div>
      ))}
    </div>
  )
}
