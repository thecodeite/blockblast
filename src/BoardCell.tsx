import './BoardCell.scss'
import { Cell, Game } from './types'

const cellChar: { [key: string]: string } = {
  red: 'ᐤ',
  yellow: '★',
  green: '☐',
  blue: '☽',
  orange: '▵',
  purple: '⬡',

  rotorH: '↔',
  rotorV: '↕',
  bomb: '💣',

  cube_red: '🧊',
  cube_yellow: '🧊',
  cube_green: '🧊',
  cube_blue: '🧊',
  cube_orange: '🧊',
  cube_purple: '🧊',

  weight_1: 'w1',
  weight_2: 'w2',
  weight_3: 'w3',
  weight_4: 'w4',

  beachball: 'bb',
}

interface BoardCellArgs {
  game: Game
  cell: Cell
  onClick?: () => void
  onMouseOver?: () => void
}

export function BoardCell({ game, cell, onClick, onMouseOver }: BoardCellArgs) {
  const { variant } = cell
  const char = cellChar[variant] || variant

  const style: React.CSSProperties = {
    bottom: `${cell.y * 41}px`,
    visibility: cell.y >= game.levelDef.height ? 'hidden' : 'visible',
  }

  return (
    <div
      className={
        `BoardCell BoardCell_${variant}` +
        (cell.remove ? ' BoardCell_remove' : '')
      }
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      <svg viewBox="0 0 20 20">
        <text x="10" y="10">
          {char}
        </text>
      </svg>
    </div>
  )
}

export function NullBoardCell() {
  return <div className="NullBoardCell" />
}
