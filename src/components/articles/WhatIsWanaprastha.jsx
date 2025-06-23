import React from 'react';
import { motion } from "framer-motion";

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

const WhatIsWanaprastha = () => {
  return (
    <section id="about" className="py-20 md:py-32">
    <MotionWrapper className="container mx-auto px-6 text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-brand-green-dark">Rediscover Your Nature</h2>
      <p className="mt-6 text-lg md:text-xl leading-relaxed text-brand-brown/90">
        Wanaprastha is a Balinese Hindu philosophy of retreating into the forest (wana) to find spiritual stillness and reconnect with the universe. It is the stage of life for reflection, where one steps back from worldly affairs to seek deeper meaning, embracing simplicity and the wisdom of nature. Our journeys are inspired by this profound tradition.
      </p>
      <blockquote className="mt-12 italic text-xl md:text-2xl font-serif text-brand-brown/80 border-l-4 border-brand-green pl-6">
        “Hutan seperti jiwa: setengah cahaya, setengah puja...”
        <span className="block text-lg text-white mt-2">— The 1 Forest is like the soul: half light, half prayer...</span>
      </blockquote>
    </MotionWrapper>
  </section>
  );
};

export default WhatIsWanaprastha;
