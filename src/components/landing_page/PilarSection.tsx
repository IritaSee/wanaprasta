"use client"

import * as React from "react"
import { motion, useInView, HTMLMotionProps, Transition } from "framer-motion"
import { cn } from "../../lib/utils"
import { Leaf, Heart, Mountain, TreePine } from "lucide-react"

const easeTransitions = {
  default: [0.25, 0.1, 0.25, 1],
  transform: [0.42, 0, 0.58, 1], 
  opacity: [0.25, 0.1, 0.25, 1], 
  clipPath: [0.6, 0.04, 0.98, 0.335], 
}

type TransformDirectionType = "top" | "bottom" | "left" | "right" | "z"

const transformVariants = (direction?: TransformDirectionType) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    scale: direction === "z" ? 0 : 1,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
})

interface WordProps {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}

const transitionConfig = { ease: easeTransitions["default"], duration: 0.5 }

function Word({
  word,
  transition = transitionConfig,
  direction = "bottom",
}: WordProps) {
  const characters = word.split("")
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface StaggerTextProps extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  transition?: Transition
  direction?: TransformDirectionType
  className?: string
}

function StaggerText({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  ...props
}: StaggerTextProps) {
  const words = text.split(" ")
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

interface CardHoverRevealContextValue {
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}

const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>(
  {} as CardHoverRevealContextValue
)

const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext)
  if (!context) {
    throw new Error(
      "useCardHoverRevealContext must be used within a CardHoverRevealProvider"
    )
  }
  return context
}

const CardHoverReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <CardHoverRevealContext.Provider
      value={{
        isHovered,
        setIsHovered,
      }}
    >
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    </CardHoverRevealContext.Provider>
  )
})
CardHoverReveal.displayName = "CardHoverReveal"

interface CardHoverRevealMainProps {
  initialScale?: number
  hoverScale?: number
}

const CardHoverRevealMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardHoverRevealMainProps
>(({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext()
  return (
    <div
      ref={ref}
      className={cn("size-full transition-transform duration-300", className)}
      style={
        isHovered
          ? { transform: `scale(${hoverScale})`, ...props.style }
          : { transform: `scale(${initialScale})`, ...props.style }
      }
      {...props}
    />
  )
})
CardHoverRevealMain.displayName = "CardHoverRevealMain"

const CardHoverRevealContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext()
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg transition-all duration-500 ease-in-out",
        className
      )}
      style={
        isHovered
          ? { translate: "0%", opacity: 1, ...props.style }
          : { translate: "0% 120%", opacity: 0, ...props.style }
      }
      {...props}
    />
  )
})
CardHoverRevealContent.displayName = "CardHoverRevealContent"

interface PillarCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  features: string[]
  gradient: string
}

const PillarCard: React.FC<PillarCardProps> = ({
  title,
  description,
  icon,
  image,
  features,
  gradient
}) => {
  return (
    <CardHoverReveal className="h-[400px] w-full rounded-2xl group cursor-pointer">
      <CardHoverRevealMain hoverScale={1.02}>
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-20"
            style={{ background: gradient }}
          />
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute top-6 left-6 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            {icon}
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </CardHoverRevealMain>

      <CardHoverRevealContent className="rounded-2xl bg-background/95 border border-border shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Learn More
          </button>
        </div>
      </CardHoverRevealContent>
    </CardHoverReveal>
  )
}

const CorePillarsSection: React.FC = () => {
  const pillars = [
    {
      title: "Wanaprastha Philosophy",
      description: "Ancient wisdom meets modern wellness through the traditional life stage of forest dwelling and spiritual growth.",
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      features: [
        "Traditional Ayurvedic practices",
        "Meditation and mindfulness",
        "Spiritual guidance sessions",
        "Ancient healing techniques"
      ],
      gradient: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      title: "Ecotourism",
      description: "Sustainable travel experiences that connect you with nature while preserving our precious ecosystems.",
      icon: <Mountain className="w-6 h-6 text-blue-500" />,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
      features: [
        "Carbon-neutral adventures",
        "Wildlife conservation tours",
        "Local community engagement",
        "Sustainable accommodation"
      ],
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
      title: "Wellness Tourism",
      description: "Holistic health journeys designed to rejuvenate your mind, body, and spirit in natural settings.",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop",
      features: [
        "Spa and wellness treatments",
        "Yoga and fitness programs",
        "Nutritional guidance",
        "Stress relief therapies"
      ],
      gradient: "linear-gradient(135deg, #ec4899, #be185d)"
    },
    {
      title: "Forest Therapy",
      description: "Immersive forest bathing experiences that harness the healing power of nature for mental and physical wellness.",
      icon: <TreePine className="w-6 h-6 text-emerald-500" />,
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop",
      features: [
        "Guided forest bathing",
        "Nature meditation sessions",
        "Therapeutic tree connections",
        "Mindful nature walks"
      ],
      gradient: "linear-gradient(135deg, #10b981, #047857)"
    }
  ]

  return (
    <section className="relative min-h-screen bg-background py-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Leaf className="w-4 h-4" />
            Our Core Pillars
          </motion.div>
          
          <StaggerText
            text="Discover the Four Pillars of Wellness Tourism"
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            stagger={0.03}
            direction="bottom"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Experience transformative journeys that blend ancient wisdom with modern wellness practices, 
            all while preserving and celebrating our natural world.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + (index * 0.1),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
            >
              <PillarCard {...pillar} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-border text-foreground rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-muted hover:scale-105">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
      />
    </section>
  )
}

export default CorePillarsSection