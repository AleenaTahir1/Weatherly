import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import DetailedForecast from './DetailedForecast';

const DailyForecast = ({ dailyForecast }) => {
  const [showDetailed, setShowDetailed] = useState(false);

  const getDayName = (dateStr) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">5-Day Forecast</h2>
            <button
              onClick={() => setShowDetailed(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {dailyForecast.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
              >
                <span className="text-gray-600 font-medium">
                  {index === 0 ? 'Today' : getDayName(day.date)}
                </span>
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="my-2"
                >
                  <WeatherIcon condition={day.condition} isDay={day.isDay} />
                </motion.div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-red-500 font-bold">{Math.round(day.maxTemp)}°</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-blue-500 font-bold">{Math.round(day.minTemp)}°</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    <WeatherIcon condition="precipitation" size="text-sm" className="inline mr-1" />
                    {day.precipitationProbability}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetailed && (
          <DetailedForecast
            forecast={dailyForecast}
            onClose={() => setShowDetailed(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DailyForecast;
