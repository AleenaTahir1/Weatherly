import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ condition }) => {
  const getBackgroundClass = () => {
    if (condition.toLowerCase().includes('rain')) return 'weather-rainy';
    if (condition.toLowerCase().includes('snow')) return 'weather-snowy';
    if (condition.toLowerCase().includes('cloud')) return 'weather-cloudy';
    return 'weather-sunny';
  };

  const particleCount = 50;
  const particles = Array.from({ length: particleCount });

  return (
    <div className={`fixed inset-0 -z-10 ${getBackgroundClass()}`}>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 20,
            x: `+=${Math.random() * 100 - 50}`,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
