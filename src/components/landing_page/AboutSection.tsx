import { useInView, motion } from "framer-motion";
import { HeartHandshake, Trees, Sun, Moon, Star, Wind, Sparkles, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import AboutParallaxBackground from "./AboutParallaxBackground";
import FloatingElements from "./FloatingElement";
import AboutAnimatedText from "./AboutAnimatedText";
import AboutFeatureCard from "./AboutFeatureCard";
import AboutStatsCounter from "./AboutStatsCounter";

const AboutSection = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  
    const features = [
      {
        icon: HeartHandshake,
        title: "Mindful Living",
        description: "Embrace a lifestyle that prioritizes mental well-being, conscious choices, and meaningful connections with yourself and others."
      },
      {
        icon: Trees,
        title: "Natural Harmony",
        description: "Find balance through nature-inspired practices that ground you in the present moment and connect you with the earth's energy."
      },
      {
        icon: Sun,
        title: "Inner Peace",
        description: "Discover tranquility through meditation, breathwork, and mindfulness techniques that calm the mind and nurture the soul."
      },
      {
        icon: Moon,
        title: "Restful Sleep",
        description: "Create sacred evening rituals and sleep practices that restore your body and prepare your mind for peaceful dreams."
      },
      {
        icon: Star,
        title: "Spiritual Growth",
        description: "Embark on a journey of self-discovery and spiritual awakening through ancient wisdom and modern mindfulness practices."
      },
      {
        icon: Wind,
        title: "Vital Energy",
        description: "Cultivate life force energy through movement, nutrition, and energy healing practices that revitalize your entire being."
      }
    ]
  
    const stats = [
      { value: 1000, label: "Lives Transformed", suffix: "+" },
      { value: 500, label: "Meditation Sessions", suffix: "+" },
      { value: 15, label: "Years of Wisdom", suffix: "" },
      { value: 98, label: "Satisfaction Rate", suffix: "%" }
    ]
  
    return (
      <section
        ref={sectionRef}
        id="about"
        className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-brand-cream via-brand-cream/95 to-brand-cream overflow-hidden"
      >
        {/* Parallax Background */}
        <AboutParallaxBackground />
        
        {/* Floating Elements */}
        <FloatingElements />
        
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/20 via-brand-cream/40 to-brand-cream/20 backdrop-blur-[1px]" />
  
        <div className="relative z-10 container mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green-dark font-medium mb-6 backdrop-blur-sm border border-brand-green/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Discover Your Inner Light
            </motion.div>
  
            <AboutAnimatedText
              text="Rediscover Your Nature"
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-dark bg-clip-text text-transparent"
              delay={0.3}
            />
  
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-brown mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
  
            <motion.p
              className="text-xl text-brand-brown/90 max-w-3xl mx-auto leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Wanaprastha is a Balinese Hindu philosophy of retreating into the forest to find spiritual stillness and reconnect with the universe. 
              It is the stage of life for reflection, where one steps back from worldly affairs to seek deeper meaning.
            </motion.p>
  
            <motion.blockquote
              className="italic text-xl md:text-2xl font-serif text-brand-brown/80 border-l-4 border-brand-green pl-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              "Hutan seperti jiwa: setengah cahaya, setengah puja..."
              <span className="block text-lg not-italic mt-2">— The Forest is like the soul: half light, half prayer...</span>
            </motion.blockquote>
          </motion.div>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {features.map((feature, index) => (
              <AboutFeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
  
          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 p-8 rounded-3xl bg-white/30 backdrop-blur-md border border-brand-green/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <AboutStatsCounter
                key={index}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
  
          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-brand-green/5 via-white/50 to-brand-brown/5 backdrop-blur-md border border-brand-green/20">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-green/10 to-brand-brown/10 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-brand-green-dark to-brand-brown bg-clip-text text-transparent">
                  Begin Your Transformation Today
                </h3>
                
                <p className="text-lg text-brand-brown/90 mb-8 max-w-2xl mx-auto">
                  Take the first step towards a more mindful, peaceful, and fulfilling life. 
                  Join our community of conscious souls on this beautiful journey of awakening.
                </p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green/90 hover:to-brand-green-dark/90 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                  >
                    Start Your Journey
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm border-brand-green/30 hover:bg-brand-green/10 transition-all duration-300 text-brand-green-dark"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  };

export default AboutSection;