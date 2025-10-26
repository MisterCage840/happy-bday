import { useState } from "react"

export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      className={`flip ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-label="Flip card"
    >
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </button>
  )
}
