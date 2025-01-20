import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 50 }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="inline-block"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun */}
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="url(#sunGradient)"
          animate={{
            scale: [1, 1.1, 1],
            filter: ["brightness(100%)", "brightness(120%)", "brightness(100%)"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cloud */}
        <motion.path
          d="M35 60 Q40 50 50 50 Q60 50 65 55 Q75 55 75 65 Q75 75 65 75 H40 Q30 75 30 65 Q30 60 35 60"
          fill="url(#cloudGradient)"
          animate={{
            x: [-5, 5, -5],
            y: [-2, 2, -2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rain drops */}
        <motion.g
          animate={{
            y: [-10, 10, -10],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="45" cy="80" r="2" fill="#60A5FA" />
          <circle cx="55" cy="85" r="2" fill="#60A5FA" />
          <circle cx="65" cy="80" r="2" fill="#60A5FA" />
        </motion.g>

        {/* Gradients */}
        <defs>
          <radialGradient id="sunGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <linearGradient id="cloudGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default Logo;
