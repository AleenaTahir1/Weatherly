import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RainDrop = ({ delay, size }) => (
  <motion.div
    initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
    animate={{ 
      y: window.innerHeight + 20,
      opacity: [0, 0.5, 0.5, 0],
    }}
    transition={{ 
      duration: 0.8 + Math.random() * 0.5,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className={`absolute ${size === 'large' ? 'w-1 h-4' : 'w-0.5 h-3'} bg-gradient-to-b from-blue-400/40 to-blue-400/10 rounded-full blur-[0.3px]`}
    style={{
      transform: 'rotate(15deg)',
      boxShadow: '0 0 2px rgba(255,255,255,0.3)'
    }}
  />
);

const Snowflake = ({ delay, size }) => {
  const shapes = ['❄', '❅', '❆'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return (
    <motion.div
      initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0, scale: size }}
      animate={{ 
        y: window.innerHeight + 20,
        x: [null, (Math.random() - 0.5) * 300],
        opacity: [0, 0.8, 0.8, 0],
        rotate: 360
      }}
      transition={{ 
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-white/60 pointer-events-none"
      style={{ textShadow: '0 0 3px rgba(255,255,255,0.5)' }}
    >
      {shape}
    </motion.div>
  );
};

const Cloud = ({ delay, scale }) => (
  <motion.div
    initial={{ x: -200, opacity: 0 }}
    animate={{ 
      x: window.innerWidth + 200,
      opacity: [0, 0.8, 0.8, 0]
    }}
    transition={{ 
      duration: 20 + Math.random() * 10,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute"
    style={{
      top: `${Math.random() * 50}%`,
      scale: scale
    }}
  >
    <div className="w-32 h-12 bg-white/30 rounded-full blur-md" />
  </motion.div>
);

const Lightning = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setVisible(true);
        setTimeout(() => setVisible(false), 100);
        setTimeout(() => {
          if (Math.random() < 0.5) {
            setVisible(true);
            setTimeout(() => setVisible(false), 50);
          }
        }, 150);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-white/30 pointer-events-none transition-all duration-50" />
  );
};

const SunRay = ({ angle, scale }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.3, 0.7, 0.3],
      scale: [scale * 0.8, scale * 1.1, scale * 0.8],
    }}
    transition={{ 
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute w-60 h-1 bg-gradient-to-r from-yellow-400/50 via-yellow-400/30 to-transparent blur-sm"
    style={{ 
      transformOrigin: 'left center',
      transform: `rotate(${angle}deg)`,
      left: '50%',
      top: '50%'
    }}
  />
);

const HeatWave = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [0.9, 1.1, 0.9],
    }}
    transition={{ 
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent pointer-events-none"
  />
);

const Fog = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ 
      opacity: [0, 0.3, 0.3, 0],
      x: window.innerWidth
    }}
    transition={{ 
      duration: 15,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute h-full w-[800px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none blur-xl"
    style={{
      top: `${Math.random() * 100}%`
    }}
  />
);

const WeatherEffects = ({ condition, intensity = 'moderate' }) => {
  const [particles, setParticles] = useState([]);
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    let particleCount;
    let cloudCount;

    switch (intensity) {
      case 'light':
        particleCount = 30;
        cloudCount = 2;
        break;
      case 'heavy':
        particleCount = 100;
        cloudCount = 5;
        break;
      default: // moderate
        particleCount = 50;
        cloudCount = 3;
    }

    switch (condition) {
      case 'rain':
      case 'drizzle':
        setParticles(Array.from({ length: particleCount }, (_, i) => ({
          id: i,
          delay: Math.random() * 2,
          size: Math.random() < 0.3 ? 'large' : 'small'
        })));
        setClouds(Array.from({ length: cloudCount }, (_, i) => ({
          id: i,
          delay: i * 5,
          scale: 0.8 + Math.random() * 0.4
        })));
        break;
      case 'snow':
        setParticles(Array.from({ length: particleCount * 0.6 }, (_, i) => ({
          id: i,
          delay: Math.random() * 3,
          size: 0.5 + Math.random() * 1
        })));
        setClouds(Array.from({ length: cloudCount }, (_, i) => ({
          id: i,
          delay: i * 5,
          scale: 0.8 + Math.random() * 0.4
        })));
        break;
      case 'sunny':
      case 'clear':
        setParticles(Array.from({ length: 24 }, (_, i) => ({
          id: i,
          angle: (i * 360) / 24,
          scale: 0.8 + Math.random() * 0.4
        })));
        break;
      case 'fog':
      case 'mist':
        setParticles(Array.from({ length: 8 }, (_, i) => ({
          id: i,
          delay: i * 2
        })));
        break;
      default:
        setParticles([]);
        setClouds([]);
    }
  }, [condition, intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {clouds.map(cloud => (
          <Cloud key={cloud.id} delay={cloud.delay} scale={cloud.scale} />
        ))}
        
        {particles.map((particle) => {
          switch (condition) {
            case 'rain':
            case 'drizzle':
              return <RainDrop key={particle.id} delay={particle.delay} size={particle.size} />;
            case 'snow':
              return <Snowflake key={particle.id} delay={particle.delay} size={particle.size} />;
            case 'sunny':
            case 'clear':
              return (
                <React.Fragment key={particle.id}>
                  <SunRay angle={particle.angle} scale={particle.scale} />
                  <HeatWave />
                </React.Fragment>
              );
            case 'fog':
            case 'mist':
              return <Fog key={particle.id} delay={particle.delay} />;
            default:
              return null;
          }
        })}
      </AnimatePresence>

      {(condition === 'thunderstorm' || condition === 'storm') && <Lightning />}
    </div>
  );
};

export default WeatherEffects;
