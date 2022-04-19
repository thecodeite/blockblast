import './BoardCell.scss'
import { Cell, ColStat } from './game'

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
}

interface BoardCellArgs {
  cell: Cell
  onClick?: () => void
}

export function BoardCell({ cell, onClick }: BoardCellArgs) {
  const { variant } = cell
  const char = cellChar[variant] || variant

  const style = {
    bottom: `${cell.y * 41}px`,
  }

  return (
    <div
      className={
        `BoardCell BoardCell_${variant}` +
        (cell.remove ? ' BoardCell_remove' : '')
      }
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
