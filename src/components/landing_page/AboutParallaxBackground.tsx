import { useScroll, useTransform, motion } from "framer-motion"
import React from "react"

const AboutParallaxBackground = () => {
    const { scrollYProgress } = useScroll()
    
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180])
  
    return (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-brand-green/20 to-brand-green/5 blur-3xl"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-brand-brown/20 to-brand-brown/5 blur-3xl"
          style={{ y: y2, rotate: rotate2 }}
        />
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-brand-green/30"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 rotate-45 bg-brand-brown/40"
          animate={{
            y: [0, 15, 0],
            rotate: [45, 90, 45],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    )
  }

  export default AboutParallaxBackground;