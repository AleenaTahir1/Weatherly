import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const WeatherForecast = ({ forecast }) => {
  const [showFullForecast, setShowFullForecast] = useState(false);

  const displayedForecast = showFullForecast ? forecast : forecast.slice(0, 5);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Hourly Forecast</h2>
        <button
          onClick={() => setShowFullForecast(!showFullForecast)}
          className="text-blue-500 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
        >
          {showFullForecast ? (
            <>
              Show Less
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </>
          ) : (
            <>
              View Full Forecast
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>

      <motion.div 
        layout
        className={`grid gap-4 ${showFullForecast ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-5'}`}
      >
        <AnimatePresence>
          {displayedForecast.map((hour, index) => (
            <motion.div
              key={hour.time}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
            >
              <span className="text-gray-600 font-medium mb-2">{hour.time}</span>
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <WeatherIcon condition={hour.condition} isDay={hour.isDay} />
              </motion.div>
              <span className="text-2xl font-bold text-gray-800 mt-2">
                {hour.temp}°C
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherForecast;
