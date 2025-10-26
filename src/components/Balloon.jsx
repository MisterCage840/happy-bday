export default function Balloon({ left, size, delay, hue }) {
  const style = {
    left,
    width: size,
    height: size * 1.25,
    animationDelay: `${delay}s`,
    background: `hsl(${hue} 90% 65%)`,
    boxShadow: `inset -6px -10px 0 hsl(${hue} 90% 55% / .45)`,
  }
  return (
    <div className="balloon" style={style}>
      <div className="knot" />
    </div>
  )
}
