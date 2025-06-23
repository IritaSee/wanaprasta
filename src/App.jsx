import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValueEvent } from "framer-motion";
import {
  Leaf,
  HeartHandshake,
  Sprout,
  Footprints,
  Trees,
  BookOpen,
  Wind,
  Play,
  Sparkles,
  Heart,
  Brain,
  Moon,
  Sun,
  Star,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  LoaderCircle,
  Mountain,
  Waves,
  TreePine,
  Users,
  Shield,
  Linkedin,
  Home,
  User,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AboutSection from "./components/landing_page/AboutSection";
import ExperiencesSection from "./components/landing_page/Experiences";
import PillarsSection from "./components/landing_page/PilarSection";
import TestimonialSection from "./components/landing_page/TestimonialSection";
// import CtaSection from "./components/landing_page/CtaSection";
// import Header from "./components/landing_page/Header"
import WanaprashthaCta from "./components/landing_page/CTASection"
// import C

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="bg-brand-mist/80 text-brand-brown selection:bg-brand-green selection:text-white">
      <audio ref={audioRef} loop>
        <source src="/forest-sounds.mp3" type="audio/mpeg" />
      </audio>
      <Header />
      <main>
        <HeroSection />
        {/* <AboutSection /> */}
        <ExperiencesSection />
        <PillarsSection />
        <TestimonialSection />
        <WanaprashthaCta />
      </main>
      <Footer />
      <Button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 text-white"
      >
        {isPlaying ? "🔊 Ambient On" : "🔇 Ambient Off"}
      </Button>
    </div>
  );
}

const MotionWrapper = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const FloatingGlassNavbar = ({
  navItems = [
    {
      name: "Home",
      link: "#",
      icon: <Home className="h-4 w-4" />
     },
     {
       name: "The Concept",
       link: "#about",
       icon: <BookOpen className="h-4 w-4" />
     },
     {
       name: "Experiences",
       link: "#experiences",
       icon: <Heart className="h-4 w-4" />
     },
     {
       name: "Pillars",
       link: "#pillars",
       icon: <Trees className="h-4 w-4" />
    }
  ],
  className,
  logo,
  showOnScroll = true
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(!showOnScroll);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
     if (!showOnScroll) return;
     
     if (typeof current === "number") {
       let direction = current - scrollYProgress.getPrevious();

       if (scrollYProgress.get() < 0.05) {
         setVisible(false);
       } else {
         if (direction < 0) {
           setVisible(true);
         } else {
           setVisible(false);
         }
       }
     }
   });

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          initial={{
            opacity: showOnScroll ? 0 : 1,
            y: showOnScroll ? -100 : 0,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-fit mx-auto ${className || ''}`}
        >
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg shadow-black/5 px-6 py-3 transition-all duration-300">
            {/* Logo */}
            {logo && (
              <div className="mr-6">
                {logo}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  className="relative flex items-center space-x-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="hidden sm:block">{item.icon}</span>
                  <span>{item.name}</span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="hidden md:flex items-center justify-center ml-6 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors duration-200 shadow-lg shadow-emerald-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex items-center justify-center p-2"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-sm bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
                onClick={toggleMobileMenu}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>

              {/* Logo */}
              {logo && (
                <div className="mb-6">
                  {logo}
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    className="flex items-center space-x-3 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    onClick={toggleMobileMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full mt-6 px-4 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-200"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Header = () => {
  const logo = (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
        {/* <Leaf className="w-5 h-5 text-white" /> */}
        <img src="/binyan.png" className="size-5"/>
      </div>
      <span className="font-bold text-white hidden sm:block">Wanaprastha</span>
    </motion.div>
  );

  return (
     <FloatingGlassNavbar 
       logo={logo}
       showOnScroll={true}
     />
   );
};

// Floating Widget Component
const FloatingWidget = ({ icon, title, value, subtitle, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      className={cn(
        "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl",
        "hover:bg-white/15 transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-emerald-400">
          {icon}
        </div>
        <span className="text-white/80 text-sm font-medium">{title}</span>
      </div>
      <div className="text-white text-xl font-bold mb-1">{value}</div>
      {subtitle && (
        <div className="text-white/60 text-xs">{subtitle}</div>
      )}
    </motion.div>
  );
};

// iPhone 15 Pro Component
const Iphone15Pro = ({ width = 300, height = 600, src, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 50C2 22.3858 24.3858 0 52 0H248C275.614 0 298 22.3858 298 50V550C298 577.614 275.614 600 248 600H52C24.3858 600 2 577.614 2 550V50Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]"
      />
      <path
        d="M4 51C4 25.5949 25.5949 4 51 4H247C272.405 4 294 25.5949 294 51V549C294 574.405 272.405 596 247 596H51C25.5949 596 4 574.405 4 549V51Z"
        className="dark:fill-[#262626] fill-white"
      />
      <path
        d="M15 52C15 31.5655 31.5655 15 52 15H246C266.435 15 283 31.5655 283 52V548C283 568.435 266.435 585 246 585H52C31.5655 585 15 568.435 15 548V52Z"
        className="fill-[#E5E5E5] dark:fill-[#404040] stroke-[#E5E5E5] dark:stroke-[#404040] stroke-[0.5]"
      />
      {src && (
        <image
          href={src}
          x="15"
          y="15"
          width="268"
          height="570"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}
      <path
        d="M107 33C107 26.3726 112.373 21 119 21H179C185.627 21 191 26.3726 191 33C191 39.6274 185.627 45 179 45H119C112.373 45 107 39.6274 107 33Z"
        className="dark:fill-[#262626] fill-[#F5F5F5]"
      />
      <defs>
        <clipPath id="roundedCorners">
          <rect
            x="15"
            y="15"
            width="268"
            height="570"
            rx="37"
            ry="37"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

// Animated Text Cycle Component
const AnimatedTextCycle = ({ words, interval = 3000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  };

  return (
    <>
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      <motion.span 
        className="relative inline-block"
        animate={{ 
          width,
          transition: { 
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

// Enhanced Get Started Button
const GetStartedButton = () => {
  return (
    <Button className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20" size="lg">
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        Start Your Journey
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
};

// Mobile Mockup Component
const MobileMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotateY: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <Iphone15Pro
            width={300}
            height={600}
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
            className="drop-shadow-2xl"
          />
        </motion.div>

        {/* Glassmorphism background elements */}
        <div className="absolute -inset-20 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -inset-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
      </div>
    </motion.div>
  );
};



const HeroSection = () => {
  const featureRef = useRef(null);
  const wanaprasthaWords = ["peace", "clarity", "balance", "wellness", "serenity"];

  useEffect(() => {
    const featureEl = featureRef.current;
    if (!featureEl) return;

    const computedBgSize = window
      .getComputedStyle(featureEl)
      .getPropertyValue('background-size');
    const zoomFactor = parseFloat(computedBgSize) / 100;
    const featureWidth = featureEl.clientWidth;
    const initialSizePx = zoomFactor * featureWidth;

    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const newSize = initialSizePx - scrollTop / 3;

      if (newSize > featureWidth) {
        featureEl.style.backgroundSize = `${newSize}px`;
        const blurAmount = scrollTop / 100;
        featureEl.style.filter = `blur(${blurAmount}px)`;
        featureEl.style.opacity = `${1 - (scrollTop / document.documentElement.scrollHeight) * 1.3}`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Parallax Background */}
      <div
        ref={featureRef}
        className="fixed top-0 left-0 right-0 w-full z-0 overflow-hidden"
        style={{
          paddingTop: '100%',
          backgroundImage: "url('https://images.unsplash.com/photo-1672128556408-cb3416ff5c7e?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '120%',
          boxShadow: '0 -50px 20px -20px rgba(16, 185, 129, 0.3) inset',
        }}
      />

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        <div className="container mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-screen">
            
            {/* Left Column - Content */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/90 text-sm">Find Your Inner Peace</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-light text-white leading-tight">
                  Discover{" "}
                  <AnimatedTextCycle 
                    words={wanaprasthaWords}
                    interval={3000}
                    className="text-emerald-400 font-medium"
                  />
                  <br />
                  through mindful living
                </h1>

                <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                  Transform your daily routine with guided meditation, breathing exercises, 
                  and mindfulness practices designed for modern life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GetStartedButton />
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">50K+</p>
                  <p className="text-white/70 text-sm">Active Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">4.9</p>
                  <p className="text-white/70 text-sm">App Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">1M+</p>
                  <p className="text-white/70 text-sm">Sessions</p>
                </div>
              </div>
            </motion.div>

            {/* Center Column - Mobile Mockup */}
            <motion.div 
              className="lg:col-span-4 flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MobileMockup />
            </motion.div>

            {/* Right Column - Floating Widgets */}
            <div className="lg:col-span-4 space-y-6">
              <FloatingWidget
                icon={<Heart className="w-6 h-6" />}
                title="Heart Rate"
                value="72 BPM"
                delay={0.6}
              />
              
              <FloatingWidget
                icon={<Brain className="w-6 h-6" />}
                title="Mindfulness Score"
                value="8.5/10"
                delay={0.8}
              />
              
              <FloatingWidget
                icon={<Leaf className="w-6 h-6" />}
                title="Today's Progress"
                value="15 min"
                delay={1.0}
              />

              {/* Glass card with meditation tip */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-white font-semibold mb-2">Today's Tip</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Take three deep breaths before checking your phone in the morning. 
                  This simple practice sets a mindful tone for your entire day.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </section>
  );
};

// Footer Component - JavaScript implementation
// Props: logo, menuItems, contactInfo, socialLinks, onNewsletterSubmit, copyright

const WanaprasthaFooter = ({
  logo = {
    name: "Wanaprastha Wisata",
    tagline: "Reconnect with nature, rediscover yourself"
  },
  menuItems = [
    {
      title: "Retreat Programs",
      links: [
        { text: "Wellness Retreats", url: "#wellness" },
        { text: "Meditation Programs", url: "#meditation" },
        { text: "Yoga Sessions", url: "#yoga" },
        { text: "Nature Therapy", url: "#nature-therapy" },
        { text: "Spiritual Journeys", url: "#spiritual" }
      ]
    },
    {
      title: "Facilities",
      links: [
        { text: "Accommodation", url: "#accommodation" },
        { text: "Organic Gardens", url: "#gardens" },
        { text: "Meditation Halls", url: "#halls" },
        { text: "Spa & Wellness", url: "#spa" },
        { text: "Dining", url: "#dining" }
      ]
    },
    {
      title: "Experience",
      links: [
        { text: "About Us", url: "#about" },
        { text: "Our Philosophy", url: "#philosophy" },
        { text: "Testimonials", url: "#testimonials" },
        { text: "Gallery", url: "#gallery" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Contact Us", url: "#contact" },
        { text: "Booking Info", url: "#booking" },
        { text: "FAQs", url: "#faqs" },
        { text: "Privacy Policy", url: "#privacy" }
      ]
    }
  ],
  contactInfo = {
    address: "Jl. Raya Ubud No. 123, Gianyar, Bali 80571, Indonesia",
    phone: "+62 361 123 4567",
    email: "info@wanaprasthawisata.com"
  },
  socialLinks = [
    { name: "Facebook", url: "#", icon: Facebook },
    { name: "Instagram", url: "#", icon: Instagram },
    { name: "Twitter", url: "#", icon: Twitter },
    { name: "Youtube", url: "#", icon: Youtube }
  ],
  onNewsletterSubmit,
  copyright = "© 2024 Wanaprastha Wisata. All rights reserved."
}) => {
  const [formState, setFormState] = useState({
    email: "",
    status: "idle", // "idle" | "loading" | "success" | "error"
    message: ""
  })

  const isLoading = formState.status === "loading"

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!onNewsletterSubmit) return

    setFormState(prev => ({ ...prev, status: "loading", message: "" }))

    try {
      const result = await onNewsletterSubmit(formState.email)
      if (!result.success) {
        setFormState(prev => ({
          ...prev,
          status: "error",
          message: result.error || "Failed to subscribe"
        }))
      } else {
        setFormState({
          email: "",
          status: "success",
          message: "Thank you for subscribing to our wellness journey!"
        })
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        status: "error",
        message: error instanceof Error ? error.message : "Failed to subscribe"
      }))
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950 dark:via-teal-950 dark:to-green-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-emerald-200/20 dark:text-emerald-800/20">
          <TreePine className="w-24 h-24" />
        </div>
        <div className="absolute top-20 right-20 text-teal-200/20 dark:text-teal-800/20">
          <Mountain className="w-32 h-32" />
        </div>
        <div className="absolute bottom-10 left-1/3 text-green-200/20 dark:text-green-800/20">
          <Waves className="w-28 h-28" />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-30"></div>
            <div className="relative max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Leaf className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Begin Your Wellness Journey
                </h2>
                <p className="text-emerald-100 text-lg">
                  Subscribe to receive mindful insights, retreat updates, and nature-inspired wisdom
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onSubmit={handleNewsletterSubmit}
                className="max-w-md mx-auto"
              >
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isLoading}
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-emerald-200 focus:bg-white/30"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-6"
                  >
                    {isLoading ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                <AnimatePresence>
                  {formState.message && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className={cn(
                        "mt-3 text-sm",
                        formState.status === "error" ? "text-red-200" : "text-emerald-200"
                      )}
                    >
                      {formState.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{logo.name}</h3>
                <p className="text-sm text-white">{logo.tagline}</p>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">{contactInfo.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-sm text-white hover:text-emerald-600 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-sm text-white hover:text-emerald-600 transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          {menuItems.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <h4 className="font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <motion.li
                    key={link.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIdx * 0.1) + (linkIdx * 0.05) }}
                  >
                    <a
                      href={link.url}
                      className="text-sm text-white hover:text-emerald-600 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.text}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-emerald-200 dark:border-emerald-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white text-center md:text-left">
              {copyright}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#terms" className="text-white hover:text-emerald-600 transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-white hover:text-emerald-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-white hover:text-emerald-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

// Mock function for newsletter subscription
async function mockNewsletterSubmit(email) {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  if (email.includes('error')) {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
  
  return { success: true }
}

const Footer = () => {
  return (
    <WanaprasthaFooter onNewsletterSubmit={mockNewsletterSubmit} />
  )
};

// Floating Elements Component for About Section


// Parallax Background Component for About Section


// Animated Text Component for About Section


// Feature Card Component for About Section


// Stats Counter Component for About Section


// Main About Section Component


// ... existing code ...
