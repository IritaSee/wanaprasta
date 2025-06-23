import { motion } from "framer-motion";
import { Leaf, X, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">Wanaprastha</span>
            </div>
  
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">The Concept</a>
              <a href="#experiences" className="text-white/80 hover:text-white transition-colors">Experiences</a>
              <a href="#pillars" className="text-white/80 hover:text-white transition-colors">Pillars</a>
            </div>
  
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Join Us
              </Button>
            </div>
  
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
  
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                <a href="#about" className="text-white/80 hover:text-white transition-colors">The Concept</a>
                <a href="#experiences" className="text-white/80 hover:text-white transition-colors">Experiences</a>
                <a href="#pillars" className="text-white/80 hover:text-white transition-colors">Pillars</a>
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="ghost" className="text-white hover:bg-white/10 justify-start">
                    Sign In
                  </Button>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white justify-start">
                    Join Us
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </nav>
      </header>
    );
  };

  export default { Header };