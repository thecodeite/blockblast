import { click } from '@testing-library/user-event/dist/click'
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
  const [auto, setAuto] = useState(true)

  if (game.levelString !== levelString) {
    setGame(createGame(levelString))
  }

  let count = 0
  let tmpGame = game
  while (tmpGame.nextGame) {
    tmpGame = tmpGame.nextGame
    count++
  }

  const doNext = () => {
    if (game.nextGame) setGame(game.nextGame)
  }

  useEffect(() => {
    if (auto && game?.nextGame) {
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
      <div className="Screen-head">
        <fieldset className="Screen-score">
          <legend>score</legend>
          {Object.entries(game.currentScore).map(([name, count]) => {
            return (
              <div key={name}>
                {name}:{count}
              </div>
            )
          })}
        </fieldset>
        <fieldset className="Screen-moves">
          <legend>moves</legend>
          {game.movesLeft}
        </fieldset>
        <div>
          <label>
            Auto:
            <input
              type="checkbox"
              checked={auto}
              onChange={(e) => setAuto(e.target.checked)}
            />
          </label>

          {game.nextGame && !auto ? (
            <button onClick={() => doNext()}>Next</button>
          ) : undefined}
          {count}
          <div>ab: {game.activeBooster}</div>
        </div>
      </div>
      <Board {...{ game, setGame }} />
      <div className="Screen-foot">
        <BoosterButton icon="🔨" name="drill" game={game} setGame={setGame} />
        <BoosterButton icon="🚂" name="train" game={game} setGame={setGame} />
        <BoosterButton icon="🪒" name="hover" game={game} setGame={setGame} />
        <BoosterButton icon="🪣" name="bucket" game={game} setGame={setGame} />
        <BoosterButton icon="🎨" name="paint" game={game} setGame={setGame} />
      </div>
    </div>
  )
}

interface BoosterButtonProps {
  icon: string
  name: string
  game: Game
  setGame: React.Dispatch<React.SetStateAction<Game>>
}
function BoosterButton({ icon, name, game, setGame }: BoosterButtonProps) {
  const active = game.activeBooster?.startsWith(name)

  const click = (booster: string) => {
    setGame({
      ...game,
      activeBooster: active && booster === name ? undefined : booster,
    })
  }

  return (
    <div className={`BoosterButton${active ? ' BoosterButton_active' : ''}`}>
      <button className="BoosterButton-button" onClick={() => click(name)}>
        {icon}
      </button>
      <div className="BoosterButton-children">
        {name === 'paint' && active
          ? game.levelDef.colours.map((colour) => (
              <button
                className={`BoosterButton-child BoosterButton-child_${colour} ${
                  game.activeBooster?.endsWith(colour)
                    ? 'BoosterButton-child_active'
                    : ''
                }`}
                onClick={() => click(`${name}:${colour}`)}
              />
            ))
          : undefined}
      </div>
    </div>
  )
}
