import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import WeatherEffects from './WeatherEffects';

const DetailedForecast = ({ forecast, onClose }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showEffects, setShowEffects] = useState(true);

  const getDayName = (dateStr) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const getWeatherIntensity = (precipitation) => {
    if (precipitation > 70) return 'heavy';
    if (precipitation > 30) return 'moderate';
    return 'light';
  };

  const getWeatherTips = (weather) => {
    const tips = [];
    if (weather.maxTemp > 30) {
      tips.push('Extreme heat! Stay hydrated and avoid prolonged sun exposure');
    } else if (weather.maxTemp > 25) {
      tips.push('Hot weather expected. Remember your sunscreen!');
    }

    if (weather.minTemp < 5) {
      tips.push('Very cold conditions. Dress in warm layers!');
    } else if (weather.minTemp < 10) {
      tips.push('Cool weather ahead. Consider bringing a jacket.');
    }

    if (weather.precipitationProbability > 70) {
      tips.push('High chance of precipitation. Bring an umbrella!');
    } else if (weather.precipitationProbability > 40) {
      tips.push('Moderate chance of precipitation. Be prepared for rain.');
    }

    return tips;
  };

  const getTimeFromDate = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-900 overflow-y-auto"
    >
      {showEffects && (
        <WeatherEffects 
          condition={forecast[selectedDay].condition} 
          intensity={getWeatherIntensity(forecast[selectedDay].precipitationProbability)}
        />
      )}
      
      <div className="container mx-auto p-4 relative">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-white"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
          >
            5-Day Forecast
          </motion.h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowEffects(!showEffects)}
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              {showEffects ? 'Hide Effects' : 'Show Effects'}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {forecast.map((day, index) => (
            <motion.button
              key={day.date}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-lg transition-all transform ${
                selectedDay === index 
                  ? 'bg-white text-blue-900 scale-105' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileHover={{ scale: selectedDay === index ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm">{index === 0 ? 'Today' : getDayName(day.date)}</div>
              <div className="flex items-center gap-2">
                <WeatherIcon condition={day.condition} size="text-2xl" />
                <span className="font-bold">{Math.round(day.maxTemp)}°</span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6"
          >
            {/* Main Weather Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-6">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl"
                  >
                    <WeatherIcon 
                      condition={forecast[selectedDay].condition} 
                      size="text-8xl"
                    />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedDay === 0 ? 'Today' : getDayName(forecast[selectedDay].date)}
                    </h2>
                    <p className="text-xl text-gray-600 capitalize">
                      {forecast[selectedDay].condition}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-3xl font-bold text-red-500">
                        {Math.round(forecast[selectedDay].maxTemp)}°
                      </span>
                      <span className="text-3xl font-bold text-blue-500">
                        {Math.round(forecast[selectedDay].minTemp)}°
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <WeatherIcon condition="precipitation" size="text-2xl" className="text-blue-500" />
                      <span className="text-gray-600">Precipitation</span>
                    </div>
                    <div className="relative h-24">
                      <div 
                        className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                        style={{ height: `${forecast[selectedDay].precipitationProbability}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {forecast[selectedDay].precipitationProbability}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <WeatherIcon condition="sunny" size="text-2xl" className="text-yellow-500" />
                      <span className="text-gray-600">Daylight</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Sunrise</span>
                        <span className="font-semibold">
                          {forecast[selectedDay].sunrise}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Sunset</span>
                        <span className="font-semibold">
                          {forecast[selectedDay].sunset}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Tips */}
            <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Weather Tips</h3>
              <div className="grid gap-4">
                {getWeatherTips(forecast[selectedDay]).map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-blue-50 rounded-lg p-4"
                  >
                    <div className="text-blue-500 text-xl">💡</div>
                    <p className="text-gray-700">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DetailedForecast;
