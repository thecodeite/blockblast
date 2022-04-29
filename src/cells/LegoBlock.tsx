export const LegoBlock = ({ meta }: { meta?: string }) => {
  const filled = meta || ''
  const corners = 'abcd'.split('').map((letter, i) => {
    const x = i % 2
    const y = Math.floor(i / 2)
    const fill = filled.includes(letter) ? 'black' : 'rgb(216, 216, 216)'

    return (
      <ellipse
        key={i}
        style={{
          fill,
          stroke: 'rgb(0, 0, 0)',
        }}
        cx={12 + x * 26}
        cy={12 + y * 26}
        rx="10"
      ></ellipse>
    )
  })
  return (
    <div>
      <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        {corners}
      </svg>
    </div>
  )
}

export const ColourLegoBlock = ({ meta }: { meta?: string }) => {
  const corners = Array.from({ length: 4 }).map((_, i) => {
    const x = i % 2
    const y = Math.floor(i / 2)

    return (
      <ellipse
        key={i}
        style={{
          fill: 'rgb(216, 216, 216, .25)',
          stroke: 'rgb(0, 0, 0)',
        }}
        cx={12 + x * 26}
        cy={12 + y * 26}
        rx="10"
      ></ellipse>
    )
  })
  return (
    <div>
      <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        {corners}
      </svg>
    </div>
  )
}
