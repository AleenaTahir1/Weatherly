import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import WeatherForecast from './WeatherForecast';
import DailyForecast from './DailyForecast';
import CitySearch from './CitySearch';
import AnimatedBackground from './AnimatedBackground';
import WeatherIcon from './WeatherIcon';
import Logo from './Logo';
import { weatherService } from '../services/weatherService';

const WeatherDashboard = () => {
  const [selectedCity, setSelectedCity] = useState({ name: 'London', latitude: 51.5074, longitude: -0.1278 });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, [selectedCity]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getWeatherData(selectedCity.latitude, selectedCity.longitude);
      setWeatherData({
        ...data,
        cityInfo: {
          name: selectedCity.name,
          country: selectedCity.country
        }
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchWeatherData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {weatherData && <AnimatedBackground condition={weatherData.current.condition} />}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4 max-w-6xl min-h-screen"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo size={80} />
          <motion.h1 
            className="text-5xl font-bold text-center mt-4 text-white drop-shadow-lg"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Weatherly
          </motion.h1>
        </div>
        
        <CitySearch onCitySelect={setSelectedCity} />

        {weatherData && (
          <>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              <WeatherCard 
                city={`${weatherData.cityInfo.name}${weatherData.cityInfo.country ? `, ${weatherData.cityInfo.country}` : ''}`}
                temperature={weatherData.current.temperature}
                condition={weatherData.current.condition}
                humidity={weatherData.current.humidity}
                windSpeed={weatherData.current.windSpeed}
                isDay={weatherData.current.isDay}
              />

              <WeatherForecast 
                forecast={weatherData.hourly.map(hour => ({
                  time: hour.time,
                  temp: hour.temp,
                  condition: hour.condition,
                  isDay: hour.isDay
                }))} 
              />
            </motion.div>

            <DailyForecast dailyForecast={weatherData.daily} />
          </>
        )}

        {weatherData && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Weather Recommendations</h2>
            <div className="text-gray-700">
              {weatherData.current.temperature > 25 ? (
                <p className="flex items-center gap-2">
                  <WeatherIcon condition="sunny" size="text-2xl" />
                  Perfect day for outdoor activities! Don't forget your sunscreen!
                </p>
              ) : weatherData.current.temperature < 15 ? (
                <p className="flex items-center gap-2">
                  <WeatherIcon condition="snow" size="text-2xl" />
                  It's a bit chilly! Consider wearing warm clothes.
                </p>
              ) : (
                <p className="flex items-center gap-2">
                  <WeatherIcon condition="partly-cloudy" size="text-2xl" />
                  Pleasant weather! Great time for a walk!
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default WeatherDashboard;
