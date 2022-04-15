import './BoardCell.scss'
import { Cell } from './game'

const colourChar: { [key: string]: string } = {
  red: 'ᐤ',
  yellow: '★',
  green: '☐',
  blue: '☽',

  rotorH: '↔',
  rotorV: '↕',
  bomb: '💣',

  cube_red: '🧊',
  cube_yellow: '🧊',
  cube_green: '🧊',
  cube_blue: '🧊',
}

interface BoardCellArgs {
  cell: Cell
  onClick?: () => void
}

export function BoardCell({ cell, onClick }: BoardCellArgs) {
  const { variant } = cell
  const char = colourChar[variant] || variant

  const style = {
    bottom: `${cell.y * 41}px`,
  }

  return (
    <div
      className={`BoardCell BoardCell_${variant}`}
      style={style}
      onClick={onClick}
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
