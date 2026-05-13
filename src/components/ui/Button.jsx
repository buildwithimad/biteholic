"use client"
import { motion } from "framer-motion"

export default function Button({ children, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-green-500 text-white rounded-md ${className}`}
    >
      {children}
    </motion.button>
  )
}