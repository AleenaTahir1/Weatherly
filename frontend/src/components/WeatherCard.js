import React from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ city, temperature, condition, humidity, windSpeed, isDay }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{city}</h2>
          <p className="text-gray-600 capitalize">{condition}</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl"
        >
          <WeatherIcon condition={condition} isDay={isDay} size="text-6xl" />
        </motion.div>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <WeatherIcon condition="temperature" size="text-2xl" className="text-red-500 mr-2" />
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            {temperature}°C
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <WeatherIcon condition="humidity" size="text-2xl" className="text-blue-500 mr-2" />
          <div>
            <p className="text-gray-600">Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <WeatherIcon condition="windy" size="text-2xl" className="text-blue-500 mr-2" />
          <div>
            <p className="text-gray-600">Wind Speed</p>
            <p className="text-xl font-semibold">{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
