"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Button from "@/components/ui/Button"

export default function BurgerCard({ burger }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={burger.image}
        alt={burger.name}
        width={300}
        height={200}
        className="w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{burger.name}</h3>
        <p className="text-gray-500">${burger.price}</p>

        <Button className="mt-3 w-full">
          Order Now
        </Button>
      </div>
    </motion.div>
  )
}