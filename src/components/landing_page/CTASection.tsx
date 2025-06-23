"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Leaf, TreePine, Mountain, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
// import React from 'react';

// Glow component implementation
const glowVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--nature-primary)/.4)_10%,_hsla(var(--nature-primary)/0)_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--nature-secondary)/.3)_10%,_hsla(var(--nature-primary)/0)_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Floating elements component
const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 animate-float-slow opacity-20">
        <Leaf className="w-8 h-8 text-green-400" />
      </div>
      <div className="absolute top-40 right-20 animate-float-medium opacity-30">
        <TreePine className="w-6 h-6 text-emerald-500" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float-fast opacity-25">
        <Mountain className="w-10 h-10 text-green-600" />
      </div>
      <div className="absolute top-60 right-10 animate-float-slow opacity-20">
        <Sparkles className="w-5 h-5 text-green-300" />
      </div>
    </div>
  );
};

// Trust indicators component
const TrustIndicators: React.FC = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  ];

  return (
    <div className="inline-flex items-center space-x-3 bg-background/80 backdrop-blur-sm border border-border rounded-full py-2 px-4 text-sm animate-fade-in-up opacity-0 [animation-delay:100ms]">
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <div 
            key={index}
            className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-green-200 shadow-sm animate-scale-in opacity-0"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <img 
              src={avatar} 
              alt="Participant avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-white animate-fade-in opacity-0 [animation-delay:600ms]">
        <span className="text-white font-semibold">127</span> early participants joined
      </p>
    </div>
  );
};

// Waitlist form component
const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full bg-background/80 border border-border focus:border-green-500 outline-none text-white text-sm backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-green-500/20"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "group relative overflow-hidden rounded-full",
              "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
              "text-white shadow-lg transition-all duration-300",
              isSubmitting && "opacity-70 cursor-not-allowed"
            )}
          >
            {isSubmitting ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="mr-2 transition-opacity duration-300 group-hover:opacity-90">
                  Join Journey
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 rounded-full px-6 py-3 text-center animate-fade-in text-sm">
          🌿 Welcome to the healing journey! We'll be in touch soon.
        </div>
      )}
    </div>
  );
};

// Main CTA component
interface WanaprasthaCtaProps {
  className?: string;
}

export function WanaprashthaCta({ className }: WanaprasthaCtaProps) {
  return (
    <section className={cn(
      "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      "dark:from-green-950 dark:via-emerald-950 dark:to-teal-950",
      className
    )}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]" />
      
      {/* Floating Nature Elements */}
      <FloatingElements />
      
      {/* Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="center"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 py-16">
        
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-8 bg-background/80 backdrop-blur-sm border-green-200 text-green-700 dark:border-green-800 dark:text-green-300 animate-fade-in-up opacity-0 [animation-delay:200ms]"
        >
          <Leaf className="w-3 h-3 mr-2" />
          Early Access Program
        </Badge>

        {/* Trust Indicators */}
        <div className="mb-8">
          <TrustIndicators />
        </div>
        
        {/* Main Heading */}
        <h1 className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8",
          "bg-gradient-to-b from-green-800 via-emerald-700 to-teal-800",
          "dark:from-green-200 dark:via-emerald-300 dark:to-teal-200",
          "bg-clip-text text-transparent",
          "animate-fade-in-up opacity-0 [animation-delay:400ms]",
          "leading-tight"
        )}>
          <span className="block">Join the</span>
          <span className="block italic font-light">Wanaprastha</span>
          <span className="block">Healing Journey</span>
        </h1>
        
        {/* Description */}
        <p className={cn(
          "text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl leading-relaxed",
          "animate-fade-in-up opacity-0 [animation-delay:600ms]"
        )}>
          Be among the first to experience transformative wellness retreats in pristine forest sanctuaries. 
          Help us craft healing journeys that reconnect you with nature and yourself.
        </p>
        
        {/* CTA Form */}
        <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:800ms]">
          <WaitlistForm />
        </div>

        {/* Secondary CTA */}
        <div className="animate-fade-in-up opacity-0 [animation-delay:1000ms]">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:text-white transition-colors duration-300"
            asChild
          >
            <a href="#learn-more" className="flex items-center">
              Learn about our vision
              <ChevronRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:1200ms]">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Forest Immersion</h3>
            <p className="text-sm text-white">Deep connection with ancient woodlands</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Holistic Healing</h3>
            <p className="text-sm text-white">Mind, body, and spirit wellness</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mountain className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Sacred Spaces</h3>
            <p className="text-sm text-white">Carefully curated retreat locations</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes appear-zoom {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-appear-zoom { animation: appear-zoom 1s ease-out forwards; }
      `}</style>

      {/* CSS Variables */}
      <style>{`
        :root {
          --nature-primary: 134 239 172;
          --nature-secondary: 52 211 153;
        }
        .dark {
          --nature-primary: 34 197 94;
          --nature-secondary: 16 185 129;
        }
      `}</style>
    </section>
  );
}

// Usage example
export default function WanaprashthaCTADemo() {
  return <WanaprashthaCta />;
}