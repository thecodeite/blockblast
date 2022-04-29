import { click } from '@testing-library/user-event/dist/click'
import { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { Board } from './Board'
import { createGame } from './game'
import { nextId } from './game.utils'
import level0 from './levels/level0'
import levels from './levels/levels'

import './Screen.scss'
import { Game } from './types'

export function Screen() {
  const navigate = useNavigate()
  const { level } = useParams()
  const levelString = level || 'level1'
  const [targetGame, setGame] = useState<Game>(() => createGame(levelString))
  const [currentGame, setCurrentGame] = useState<Game>(targetGame)
  const [auto, setAuto] = useState(true)

  if (currentGame.levelString !== levelString) {
    const newGame = createGame(levelString)
    setGame(newGame)
    setCurrentGame(newGame)
  }

  let count = 0
  // let tmpGame = game
  // while (tmpGame.nextGame) {
  //   tmpGame = tmpGame.nextGame
  //   count++
  // }

  const doNext = () => {
    if (currentGame !== targetGame) {
      let nextGame = targetGame
      while (
        nextGame.previousGame &&
        nextGame.previousGame.id !== currentGame.id
      ) {
        nextGame = nextGame.previousGame
      }
      setCurrentGame(nextGame)
    }
  }

  useEffect(() => {
    if (currentGame?.hasWon) return

    if (auto && currentGame !== targetGame) {
      let nextGame = targetGame
      while (
        nextGame.previousGame &&
        nextGame.previousGame.id !== currentGame.id
      ) {
        nextGame = nextGame.previousGame
      }

      const h = setTimeout(() => {
        //console.log(`tick`)
        setCurrentGame(nextGame)
      }, 100)
      return () => clearTimeout(h)
    } else {
      //console.log(`done`)
    }
  }, [currentGame, targetGame])

  if (currentGame?.hasWon) {
    const nextLevel = parseInt(levelString.substring('level'.length)) + 1

    return <Navigate to={`/blockblast/level` + nextLevel} />
  }

  if (!currentGame) return <div />

  return (
    <div className="Screen">
      <div className="Screen-head">
        <fieldset className="Screen-score">
          <legend>score</legend>
          {Object.entries(currentGame.currentScore).map(([name, count]) => {
            return (
              <div key={name}>
                {name}:{count}
              </div>
            )
          })}
        </fieldset>
        <fieldset className="Screen-moves">
          <legend>moves</legend>
          {currentGame.movesLeft}
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

          {currentGame !== targetGame && !auto ? (
            <button onClick={() => doNext()}>Next</button>
          ) : undefined}
          {count}
          <div>ab: {currentGame.activeBooster}</div>
        </div>
      </div>
      <Board {...{ game: currentGame, setGame }} />
      <div className="Screen-foot">
        <BoosterButton
          icon="🔨"
          name="drill"
          game={currentGame}
          setGame={setGame}
        />
        <BoosterButton
          icon="🚂"
          name="train"
          game={currentGame}
          setGame={setGame}
        />
        <BoosterButton
          icon="🪒"
          name="hover"
          game={currentGame}
          setGame={setGame}
        />
        <BoosterButton
          icon="🪣"
          name="bucket"
          game={currentGame}
          setGame={setGame}
        />
        <BoosterButton
          icon="🎨"
          name="paint"
          game={currentGame}
          setGame={setGame}
        />
      </div>
      <select
        value={levelString}
        onChange={(e) => navigate(`/blockblast/${e.target.value}`)}
      >
        {Object.keys(levels)
          .filter((str) => /level\d+/.test(str))
          .map((level) => (
            <option>{level}</option>
          ))}
      </select>
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
      id: nextId(),
      previousGame: game,
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
