import { ReactNode } from 'react'
import './BoardCell.scss'
import { Cell, Game, Overlay } from '../types'
import { ColourLegoBlock, LegoBlock } from './LegoBlock'

const cellChar: {
  [key: string]: string | (({ meta }: { meta?: string }) => ReactNode)
} = {
  red: 'ᐤ',
  yellow: '★',
  green: '☐',
  blue: '☽',
  orange: '▵',
  purple: '⬡',

  rotorH: '↔',
  rotorV: '↕',
  bomb: '💣',

  cube: '🕋 ',
  cube_red: '🕋 ',
  cube_yellow: '🕋 ',
  cube_green: '🕋 ',
  cube_blue: '🕋 ',
  cube_orange: '🕋 ',
  cube_purple: '🕋 ',

  weight_1: 'w1',
  weight_2: 'w2',
  weight_3: 'w3',
  weight_4: 'w4',

  beachball: ' ',

  block: LegoBlock,
  cblock: ColourLegoBlock,
  cage: '||||',
  ice: '🧊',
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
  if (type === 'colour' && neighbours) {
    if (neighbours >= 9) {
      char = '[]'
    } else if (neighbours >= 7) {
      char = '*'
    } else if (neighbours >= 5) {
      char = '⬀'
    }
  }

  const style: React.CSSProperties = {
    bottom: `${cell.y * 41}px`,
    visibility: cell.y >= game.levelDef.height ? 'hidden' : 'visible',
    //opacity: 0.5,
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

  const body =
    typeof char === 'string' ? (
      <svg viewBox="0 0 20 20">
        <text x="10" y="10">
          {char}
        </text>
      </svg>
    ) : (
      char({ meta: cell.meta })
    )

  return (
    <div
      className={
        `BoardCell BoardCell_${variant}` +
        (cell.remove ? ' BoardCell_remove' : '') +
        (cell.meta ? ` BoardCell_${variant}_${cell.meta}` : '')
      }
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {body}
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
