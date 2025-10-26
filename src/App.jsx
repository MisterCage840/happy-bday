import { useEffect, useMemo, useRef, useState } from "react"
// NOTE: we will lazy-load confetti, so no direct import here
import Balloon from "./components/Balloon.jsx"
import FlipCard from "./components/FlipCard.jsx"

const HER_NAME = "The One and Only Leeno" // ← customize her name
const FROM_NAME = "Mohammad" // ← your name

export default function App() {
  const [popped, setPopped] = useState(false)
  const confettiRef = useRef(null)

  // sprinkle balloons
  const balloons = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 90 + 5}%`,
        size: Math.random() * 28 + 42,
        delay: Math.random() * 6,
        hue: Math.floor(Math.random() * 360),
      })),
    []
  )

  useEffect(() => {
    // lazy-load confetti after the first paint
    import("canvas-confetti").then((mod) => {
      confettiRef.current = mod.default
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      if (!prefersReduced) {
        confettiRef.current({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.9 },
        })
      }
    })
  }, [])

  const fireConfetti = () => {
    if (popped || !confettiRef.current) return
    setPopped(true)

    const confetti = confettiRef.current
    const small = window.innerWidth < 480
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // 🔊 Play funny fart sound
    const fart = new Audio("/fart.mp3")
    fart.volume = 0.6
    fart.play().catch(() => {}) // ignore autoplay blocks

    // 💨 Trigger confetti
    if (!prefersReduced) {
      const duration = small ? 700 : 1200
      const end = Date.now() + duration
      const step = () => {
        confetti({
          particleCount: small ? 8 : 12,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        })
        confetti({
          particleCount: small ? 8 : 12,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        })
        if (Date.now() < end) requestAnimationFrame(step)
      }
      step()
    }

    if (navigator.vibrate) navigator.vibrate(20)

    // 😳 Show the funny \"oops\" message on screen
    const oops = document.createElement("div")
    oops.textContent = "💨 Oops... god damn, forgot to fix that."
    oops.style.position = "fixed"
    oops.style.bottom = "20%"
    oops.style.left = "50%"
    oops.style.transform = "translateX(-50%)"
    oops.style.background = "rgba(0,0,0,0.7)"
    oops.style.color = "#fff"
    oops.style.padding = "12px 18px"
    oops.style.borderRadius = "10px"
    oops.style.fontSize = "16px"
    oops.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
    oops.style.zIndex = "9999"
    oops.style.animation = "fadeOut 2.5s ease forwards"

    document.body.appendChild(oops)
    setTimeout(() => oops.remove(), 3500)
  }

  const compliments = [
    {
      front: "Reason #1",
      back: "Your laugh should be illegal. (But I aint snitching tho.)",
    },
    { front: "Reason #2", back: "Certified chaos & good vibes distributor." },
    { front: "Reason #3", back: "You made the last 15 days way more fun." },
    {
      front: "Bonus",
      back: "And yes I would still like you if you were a worm. 😒",
    },
  ]

  return (
    <div className="page">
      <div aria-hidden="true">
        {balloons.map((b) => (
          <Balloon
            key={b.id}
            left={b.left}
            size={b.size}
            delay={b.delay}
            hue={b.hue}
          />
        ))}
      </div>

      <header className="hero">
        <div className="tag">🎉 Birthday Mode</div>
        <h1>
          Happy Birthday, <span className="highlight">{HER_NAME}</span>!
        </h1>
        <p className="sub">
          I can’t be there (yet), so I built you a tiny slice of joy instead.
        </p>
        <button
          className={`celebrate ${popped ? "disabled" : ""}`}
          onClick={fireConfetti}
        >
          {popped
            ? "🎂 Wish granted!"
            : "🎂 Take your time - Make a wish - then click on me"}
        </button>
      </header>

      <section className="cards">
        {compliments.map((c, i) => (
          <FlipCard key={i} front={c.front} back={c.back} />
        ))}
      </section>

      <section className="note">
        <p>
          P.S. There might be a little real-world surprise later today. Keep an
          eye on your door 👀
        </p>
        <p className="sig">— {FROM_NAME}</p>
      </section>

      <footer className="footer">
        <small>
          <strong>28/10/2025 </strong>
        </small>
      </footer>
    </div>
  )
}
