import { useInView, useSpring, useTransform, motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import React from "react"

const AboutStatsCounter = ({ value, label, suffix = "", delay = 0 }) => {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: true })
    const [hasAnimated, setHasAnimated] = useState(false)
  
    const springValue = useSpring(0, {
      stiffness: 50,
      damping: 15,
    })
  
    useEffect(() => {
      if (isInView && !hasAnimated) {
        springValue.set(value)
        setHasAnimated(true)
      }
    }, [isInView, value, springValue, hasAnimated])
  
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))
  
    return (
        <motion.div
        ref={countRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay }}
        className="text-center group"
      >
        <motion.div
          className="text-4xl md:text-5xl font-bold text-brand-green-dark mb-2"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span>{displayValue}</motion.span>
          <span>{suffix}</span>
        </motion.div>
        <p className="text-brand-brown/80 font-medium">{label}</p>
        <motion.div
          className="w-12 h-1 bg-brand-green/30 mx-auto mt-2 group-hover:bg-brand-green transition-colors duration-300"
          initial={{ width: 0 }}
          animate={isInView ? { width: 48 } : { width: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </motion.div>
    )
  }

  export default AboutStatsCounter;