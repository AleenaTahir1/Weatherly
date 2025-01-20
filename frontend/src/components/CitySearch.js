import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { WiDaySunny } from 'react-icons/wi';

const CitySearch = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);

  const searchCities = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );

      if (response.data.results) {
        setSuggestions(response.data.results.map(city => ({
          name: city.name,
          country: city.country,
          admin1: city.admin1, // State/Province
          latitude: city.latitude,
          longitude: city.longitude
        })));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError('Failed to fetch cities. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm) {
      debounceTimeout.current = setTimeout(() => {
        searchCities(searchTerm);
      }, 300);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-white/90 backdrop-blur-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {(suggestions.length > 0 || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
          >
            {error ? (
              <div className="px-4 py-3 text-red-500">{error}</div>
            ) : (
              suggestions.map((city, index) => (
                <motion.div
                  key={`${city.name}-${city.latitude}-${city.longitude}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => handleCitySelect(city)}
                >
                  <WiDaySunny className="text-2xl text-blue-500 mr-2" />
                  <div>
                    <div className="font-medium text-gray-800">{city.name}</div>
                    <div className="text-sm text-gray-600">
                      {[city.admin1, city.country].filter(Boolean).join(', ')}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySearch;
