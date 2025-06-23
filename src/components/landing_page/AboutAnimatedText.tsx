import { motion } from "framer-motion";
import React from "react";

const AboutAnimatedText = ({ text, className, delay = 0 }) => {
    const words = text.split(" ")
    
    return (
      <div className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3 last:mr-0">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  delay: delay + wordIndex * 0.1 + letterIndex * 0.03,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 0.6
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </div>
    )
  }
export default AboutAnimatedText;