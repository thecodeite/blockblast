import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Board } from './Board'
import { createGame } from './game'
import levels from './levels/levels'

import './Screen.scss'

export function Screen() {
  const { level } = useParams()
  const [game, setGame] = useState(() => createGame(levels[level || 'level1']))

  return (
    <div className="Screen">
      <Board {...{ game, setGame }} />
      <fieldset>
        <legend>score</legend>
        {game.score.map(({ name, left }) => {
          return (
            <div key={name}>
              {name}:{left}
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
