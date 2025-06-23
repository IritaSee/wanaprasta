// import { motion } from "framer-motion";
"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { cn } from "../../lib/utils";
import { Leaf, Heart, Star, Sparkles, Mountain, Waves } from "lucide-react";
import { cn } from "../../lib/utils";

// Dimensions hook
interface Dimensions {
  width: number;
  height: number;
}

function useDimensions(ref: React.RefObject<HTMLElement | SVGElement>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 250);
    };

    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions);
      clearTimeout(timeoutId);
    };
  }, [ref]);

  return dimensions;
}

// Animated Gradient Component
interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef as React.RefObject<HTMLElement>);

  const circleSize = Math.max(dimensions.width, dimensions.height);

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 50}%`,
                "--background-gradient-speed": `${1 / speed}s`,
                "--tx-1": Math.random() - 0.5,
                "--ty-1": Math.random() - 0.5,
                "--tx-2": Math.random() - 0.5,
                "--ty-2": Math.random() - 0.5,
                "--tx-3": Math.random() - 0.5,
                "--ty-3": Math.random() - 0.5,
                "--tx-4": Math.random() - 0.5,
                "--ty-4": Math.random() - 0.5,
              } as React.CSSProperties
            }
            width={circleSize * randomInt(0.5, 1.5)}
            height={circleSize * randomInt(0.5, 1.5)}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

// Floating Elements Component
const FloatingElements: React.FC = () => {
  const elements = [
    { icon: Leaf, delay: 0, x: "10%", y: "20%" },
    { icon: Heart, delay: 2, x: "80%", y: "15%" },
    { icon: Star, delay: 4, x: "15%", y: "70%" },
    { icon: Sparkles, delay: 1, x: "85%", y: "75%" },
    { icon: Mountain, delay: 3, x: "50%", y: "10%" },
    { icon: Waves, delay: 5, x: "70%", y: "60%" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute text-foreground/20"
            style={{ left: element.x, top: element.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeInOut"
            }}
          >
            <IconComponent size={24} />
          </motion.div>
        );
      })}
    </div>
  );
};

// Experience Card Component
interface ExperienceCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradientColors: string[];
  delay: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
  icon: IconComponent,
  gradientColors,
  delay
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{ perspective: "1000px" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-sm h-80 p-6">
        <AnimatedGradient colors={gradientColors} speed={0.1} blur="medium" />
        
        <motion.div
          className="relative z-10 h-full flex flex-col justify-between"
          animate={{ 
            rotateY: isHovered ? -5 : 0,
            rotateX: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <motion.div
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <IconComponent size={32} className="text-primary" />
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-foreground"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
          </div>
          
          <motion.p 
            className="text-foreground/70 leading-relaxed"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Main Wellness Experiences Component
const ExperiencesSection: React.FC = () => {
  const experiences = [
    {
      title: "Mindful Meditation",
      description: "Find inner peace through guided meditation sessions in our serene mountain sanctuary. Connect with your breath and discover tranquility.",
      icon: Heart,
      gradientColors: ["#FF6B6B", "#FF8E8E", "#FFB3B3"],
    },
    {
      title: "Nature Immersion",
      description: "Reconnect with the natural world through forest bathing, hiking trails, and outdoor yoga sessions surrounded by pristine wilderness.",
      icon: Leaf,
      gradientColors: ["#4ECDC4", "#44A08D", "#093637"],
    },
    {
      title: "Holistic Healing",
      description: "Experience transformative wellness treatments combining ancient wisdom with modern techniques for complete mind-body restoration.",
      icon: Sparkles,
      gradientColors: ["#A8E6CF", "#88D8A3", "#68C583"],
    },
    {
      title: "Mountain Therapy",
      description: "Breathe in the crisp mountain air while engaging in therapeutic activities designed to rejuvenate your spirit and strengthen your body.",
      icon: Mountain,
      gradientColors: ["#FFD93D", "#6BCF7F", "#4D96FF"],
    },
    {
      title: "Aqua Wellness",
      description: "Immerse yourself in healing waters with hydrotherapy sessions, mineral baths, and waterside meditation practices.",
      icon: Waves,
      gradientColors: ["#74B9FF", "#0984E3", "#6C5CE7"],
    },
    {
      title: "Stellar Reflection",
      description: "End your days with stargazing sessions and nighttime reflection practices that connect you to the cosmos and your inner wisdom.",
      icon: Star,
      gradientColors: ["#FD79A8", "#E84393", "#6C5CE7"],
    },
  ];

  return (
    <section id="experiences" className="relative min-h-screen bg-white py-20 px-6 overflow-hidden">
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Wellness Experiences
          </motion.h2>
          <motion.p 
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover transformative journeys designed to nurture your mind, body, and soul 
            in our peaceful mountain retreat sanctuary.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              {...experience}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        @keyframes background-gradient {
          0%, 100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)));
          }
          40% {
            transform: translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)));
          }
          60% {
            transform: translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)));
          }
          80% {
            transform: translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)));
          }
        }
        
        .animate-background-gradient {
          animation: background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
        }
      `}</style>
    </section>
  );
};
export default ExperiencesSection;