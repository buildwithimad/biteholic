"use client"
import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08, // smoothness (lower = smoother)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return children
}