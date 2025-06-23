"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarImage } from '../ui/avatar';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
  location: string;
}

interface TestimonialData {
  id: number;
  author: TestimonialAuthor;
  text: string;
  rating: number;
  experience: string;
  retreat: string;
}

const testimonials: TestimonialData[] = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      handle: "@sarahwellness",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, CA"
    },
    text: "The forest retreat completely transformed my perspective on wellness. The mindfulness sessions among the ancient trees were life-changing. I found a peace I never knew existed.",
    rating: 5,
    experience: "7-Day Mindfulness Retreat",
    retreat: "Redwood Sanctuary"
  },
  {
    id: 2,
    author: {
      name: "Marcus Johnson",
      handle: "@marcusheals",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Portland, OR"
    },
    text: "After months of burnout, this retreat gave me exactly what I needed. The combination of forest bathing and meditation helped me reconnect with myself and nature.",
    rating: 5,
    experience: "5-Day Forest Immersion",
    retreat: "Pine Valley Wellness"
  },
  {
    id: 3,
    author: {
      name: "Elena Rodriguez",
      handle: "@elenazen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      location: "Austin, TX"
    },
    text: "The healing power of the forest is real. Every morning walk, every meditation session, every breath of fresh air contributed to my mental and physical restoration.",
    rating: 5,
    experience: "10-Day Healing Journey",
    retreat: "Cedar Mountain Retreat"
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      handle: "@davidnature",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Seattle, WA"
    },
    text: "I came seeking stress relief and left with a completely new understanding of wellness. The forest retreat exceeded every expectation I had.",
    rating: 5,
    experience: "Weekend Wellness Escape",
    retreat: "Evergreen Sanctuary"
  },
  {
    id: 5,
    author: {
      name: "Lisa Thompson",
      handle: "@lisaforest",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      location: "Denver, CO"
    },
    text: "The perfect blend of luxury and nature. The accommodations were beautiful, the food was nourishing, and the forest activities were deeply restorative.",
    rating: 5,
    experience: "Luxury Forest Retreat",
    retreat: "Aspen Grove Wellness"
  }
];

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const starSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Star 
            className={cn(
              starSizes[size],
              index < rating 
                ? "fill-amber-400 text-amber-400" 
                : "fill-gray-200 text-gray-200"
            )} 
          />
        </motion.div>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, isActive }: { testimonial: TestimonialData; isActive: boolean }) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 h-full",
        "bg-gradient-to-br from-emerald-50/80 to-teal-50/80",
        "border border-emerald-100/50 backdrop-blur-sm",
        "shadow-lg shadow-emerald-900/5",
        isActive && "ring-2 ring-emerald-200"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -top-4 -right-4 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="h-16 w-16 text-emerald-600" />
      </motion.div>

      {/* Quote icon */}
      <div className="absolute top-6 left-6 opacity-20">
        <Quote className="h-8 w-8 text-emerald-600" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar className="h-14 w-14 ring-2 ring-emerald-200">
                <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
              </Avatar>
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-400/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {testimonial.author.name}
              </h3>
              <p className="text-emerald-600 text-sm font-medium">
                {testimonial.author.handle}
              </p>
              <p className="text-gray-500 text-xs">
                {testimonial.author.location}
              </p>
            </div>
          </div>
          <StarRating rating={testimonial.rating} size="sm" />
        </div>

        {/* Testimonial text */}
        <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1 text-base">
          "{testimonial.text}"
        </blockquote>

        {/* Footer */}
        <div className="pt-4 border-t border-emerald-100">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-700">
                {testimonial.experience}
              </span>
              <span className="text-xs text-gray-500">
                {testimonial.retreat}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ForestTestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getVisibleCount = (width: number): number => {
    if (width >= 1280) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      const oldVisibleCount = getVisibleCount(windowWidth);
      const newVisibleCount = getVisibleCount(newWidth);
      
      if (oldVisibleCount !== newVisibleCount) {
        const maxIndexForNewWidth = testimonials.length - newVisibleCount;
        if (currentIndex > maxIndexForNewWidth) {
          setCurrentIndex(Math.max(0, maxIndexForNewWidth));
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        const visibleCount = getVisibleCount(windowWidth);
        const maxIndex = testimonials.length - visibleCount;

        if (currentIndex >= maxIndex) {
          setDirection(-1);
          setCurrentIndex((prev) => prev - 1);
        } else if (currentIndex <= 0) {
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCurrentIndex((prev) => prev + direction);
        }
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, windowWidth, direction]);

  const visibleCount = getVisibleCount(windowWidth);
  const maxIndex = testimonials.length - visibleCount;
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goNext = () => {
    if (canGoNext) {
      setDirection(1);
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      pauseAutoPlay();
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      setDirection(-1);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      pauseAutoPlay();
    }
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/6 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200/50 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </motion.div>
            <span className="text-sm font-medium text-emerald-700">
              ✨ Guest Experiences
            </span>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
              Transformative
            </span>
            <br />
            <span className="text-gray-800">
              Forest Journeys
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our wellness retreats have transformed lives through the healing power of nature and mindful forest experiences.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative" ref={containerRef}>
          {/* Navigation Controls */}
          <div className="flex justify-center sm:justify-end sm:absolute sm:-top-16 right-0 space-x-3 mb-8 sm:mb-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrev}
              disabled={!canGoPrev}
              className={cn(
                "p-3 rounded-full transition-all duration-300",
                canGoPrev 
                  ? 'bg-white/80 shadow-lg hover:bg-white hover:shadow-xl text-emerald-600 border border-emerald-100' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNext}
              disabled={!canGoNext}
              className={cn(
                "p-3 rounded-full transition-all duration-300",
                canGoNext 
                  ? 'bg-white/80 shadow-lg hover:bg-white hover:shadow-xl text-emerald-600 border border-emerald-100' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 20 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    "flex-shrink-0 px-3",
                    visibleCount === 3 ? 'w-1/3' : 
                    visibleCount === 2 ? 'w-1/2' : 'w-full'
                  )}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    isActive={index >= currentIndex && index < currentIndex + visibleCount}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: testimonials.length - visibleCount + 1 }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === currentIndex 
                      ? 'bg-emerald-500' 
                      : 'bg-emerald-200 hover:bg-emerald-300'
                  )}
                  animate={{ 
                    scale: index === currentIndex ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: index === currentIndex ? Infinity : 0,
                    repeatDelay: 1
                  }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-emerald-400/30"
                    animate={{ 
                      scale: [1, 1.8],
                      opacity: [1, 0] 
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { number: "500+", label: "Happy Guests" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "15+", label: "Retreat Programs" },
            { number: "4.9", label: "Average Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 text-sm font-medium group-hover:text-gray-800 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ForestTestimonialSection;