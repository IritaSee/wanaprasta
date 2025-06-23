import { motion } from "framer-motion"
import React from "react"
import { memo } from "react"

const FloatingElements = () => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-brand-green/10 backdrop-blur-sm"
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

export default FloatingElements