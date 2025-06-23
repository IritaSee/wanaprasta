import { useInView, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import React, { useRef } from "react"

const AboutFeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="group relative"
      >
        <div className="relative p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-brand-green/20 hover:border-brand-green/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-green/10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6 text-brand-green-dark group-hover:bg-brand-green/20 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-3 text-brand-green-dark group-hover:text-brand-green transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-brand-brown/80 leading-relaxed">
              {description}
            </p>
            
            <motion.div
              className="mt-4 flex items-center text-brand-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  export default AboutFeatureCard