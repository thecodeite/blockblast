import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Board } from './Board'
import { createGame } from './game'
import level0 from './levels/level0'
import levels from './levels/levels'

import './Screen.scss'
import { Game } from './types'

export function Screen() {
  const { level } = useParams()
  const levelString = level || 'level1'
  const [game, setGame] = useState<Game>(() => createGame(levelString))

  if (game.levelString !== levelString) {
    setGame(createGame(levelString))
  }

  useEffect(() => {
    if (game?.nextGame) {
      const nextGame = game.nextGame
      const h = setTimeout(() => {
        //console.log(`tick`)
        setGame(nextGame)
      }, 100)
      return () => clearTimeout(h)
    } else {
      //console.log(`done`)
    }
  }, [game])

  if (game?.hasWon) {
    const nextLevel = parseInt(levelString.substring('level'.length)) + 1

    return <Navigate to={`/level` + nextLevel} />
  }

  if (!game) return <div />

  return (
    <div className="Screen">
      <Board {...{ game, setGame }} />
      <fieldset>
        <legend>score</legend>
        {Object.entries(game.currentScore).map(([name, count]) => {
          return (
            <div key={name}>
              {name}:{count}
            </div>
          )
        })}
      </fieldset>
      <fieldset>
        <legend>moves</legend>
        {game.movesLeft}
      </fieldset>
    </div>
  )
}
