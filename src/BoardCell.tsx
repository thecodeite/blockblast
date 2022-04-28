import './BoardCell.scss'
import { Cell, Game, Overlay } from './types'

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

  cube: '🧊',
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

  beachball: ' ',

  block_1: '_',
  cage: '||||',
}

interface BoardCellArgs {
  game: Game
  cell: Cell
  overlay?: Overlay
  onClick?: () => void
  onMouseOver?: () => void
}

export function BoardCell({
  game,
  cell,
  overlay,
  onClick,
  onMouseOver,
}: BoardCellArgs) {
  const { type, variant, child, neighbours } = cell
  let char = cellChar[variant] || variant
  if (neighbours) {
    if (neighbours >= 9) {
      char = '[]'
    } else if (neighbours >= 7) {
      char = '*'
    } else if (neighbours >= 5) {
      char = '/'
    }
  }

  const style: React.CSSProperties = {
    bottom: `${cell.y * 41}px`,
    // visibility: cell.y >= game.levelDef.height ? 'hidden' : 'visible',
    opacity: 0.5,
  }

  if (type === 'null') {
    return (
      <div
        className={
          `BoardCell BoardCell_${variant}` +
          (cell.remove ? ' BoardCell_remove' : '')
        }
        style={style}
        onMouseOver={onMouseOver}
      >
        {overlay?.isBubble ? (
          <div className="BoardCell-overlay"></div>
        ) : undefined}
      </div>
    )
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
      {overlay?.isBubble ? (
        <div className="BoardCell-overlay"></div>
      ) : undefined}
      {child ? (
        <div className="BoardCell-child">
          <BoardCell game={game} cell={{ ...child, y: 0 }} />
        </div>
      ) : undefined}
    </div>
  )
}

export function NullBoardCell() {
  return <div className="NullBoardCell" />
}
