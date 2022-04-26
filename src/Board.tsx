import { useEffect } from 'react'

import './Board.scss'
import { BoardCell, NullBoardCell } from './BoardCell'
import { tap } from './game'
import { Cell, Game } from './types'

interface BoardArgs {
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game>>
}

export function Board({ game, setGame }: BoardArgs) {
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
      }, 100)
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
