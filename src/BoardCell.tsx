import './BoardCell.scss'
import { Cell } from './game'

const colourChar: { [key: string]: string } = {
  red: 'ᐤ',
  yellow: '★',
  green: '☐',
  blue: '☽',
}

interface BoardCellArgs {
  cell: Cell
  onClick?: () => void
}

export function BoardCell({ cell, onClick }: BoardCellArgs) {
  const { colour } = cell
  const char = colourChar[colour] || colour

  const style = {
    bottom: `${cell.y * 41}px`,
  }

  return (
    <div
      className={`BoardCell BoardCell_${colour}`}
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
