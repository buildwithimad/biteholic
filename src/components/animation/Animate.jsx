"use client"
import { motion } from "framer-motion"

export default function Animate({
  children,
  delay = 0,
  duration = 0.6,
  y = 40,
  x = 0,
  scale = 1,
  className
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}