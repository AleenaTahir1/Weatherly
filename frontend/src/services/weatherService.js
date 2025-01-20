import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

const weatherService = {
    // Get coordinates for a city
    getCoordinates: async (city) => {
        try {
            const response = await axios.get(
                `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1`
            );
            if (response.data.results && response.data.results.length > 0) {
                return response.data.results[0];
            }
            throw new Error('City not found');
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            throw error;
        }
    },

    getWeatherData: async (latitude, longitude) => {
        try {
            // Get user's timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            const response = await axios.get(`${BASE_URL}/forecast`, {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code',
                    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
                    current_weather: true,
                    timezone: timezone, // Use local timezone
                    forecast_days: 5
                }
            });

            const { current_weather, hourly, daily } = response.data;
            
            // Convert weather codes to detailed conditions
            const getCondition = (code) => {
                // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
                if (code === 0) return 'clear';
                if (code === 1) return 'sunny';
                if (code === 2) return 'partly-cloudy';
                if (code === 3) return 'cloudy';
                if (code >= 45 && code <= 48) return 'fog';
                if (code >= 51 && code <= 55) return 'drizzle';
                if (code >= 61 && code <= 65) return 'rain';
                if (code >= 71 && code <= 77) return 'snow';
                if (code >= 80 && code <= 82) return 'rain';
                if (code >= 85 && code <= 86) return 'snow';
                if (code >= 95) return 'thunderstorm';
                return 'clear';
            };

            // Check if it's daytime based on sunrise/sunset
            const isDay = (timestamp) => {
                const date = new Date(timestamp);
                const currentDayIndex = daily.time.findIndex(day => 
                  new Date(day).toDateString() === date.toDateString()
                );
                
                if (currentDayIndex === -1) return true;
                
                const sunrise = new Date(daily.sunrise[currentDayIndex]);
                const sunset = new Date(daily.sunset[currentDayIndex]);
                
                return date >= sunrise && date <= sunset;
            };

            // Process current weather
            const current = {
                temperature: Math.round(current_weather.temperature),
                windSpeed: Math.round(current_weather.windspeed),
                condition: getCondition(current_weather.weathercode),
                isDay: isDay(new Date()),
                humidity: hourly.relative_humidity_2m[0]
            };

            // Process hourly forecast
            const hourlyData = [];
            for (let i = 0; i < 24; i++) {
                const timestamp = new Date(hourly.time[i]);
                const condition = getCondition(hourly.weather_code[i]);
                hourlyData.push({
                    time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    temp: Math.round(hourly.temperature_2m[i]),
                    condition,
                    isDay: isDay(timestamp)
                });
            }

            // Process 5-day forecast with proper timezone handling
            const dailyData = daily.time.map((date, index) => {
                const condition = getCondition(daily.weather_code[index]);
                
                // Parse sunrise and sunset times with explicit timezone
                const formatTimeWithTimezone = (isoString) => {
                  const date = new Date(isoString);
                  return date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: timezone
                  });
                };

                return {
                  date,
                  maxTemp: daily.temperature_2m_max[index],
                  minTemp: daily.temperature_2m_min[index],
                  condition,
                  isDay: true,
                  precipitationProbability: Math.round(daily.precipitation_probability_max[index]),
                  sunrise: formatTimeWithTimezone(daily.sunrise[index]),
                  sunset: formatTimeWithTimezone(daily.sunset[index])
                };
            });

            return {
                current,
                hourly: hourlyData,
                daily: dailyData
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    },

    // Combined function to get weather for a city
    getWeatherForCity: async (city) => {
        try {
            const coordinates = await weatherService.getCoordinates(city);
            const weatherData = await weatherService.getWeatherData(
                coordinates.latitude,
                coordinates.longitude
            );
            return {
                ...weatherData,
                cityInfo: {
                    name: coordinates.name,
                    country: coordinates.country
                }
            };
        } catch (error) {
            console.error('Error fetching weather for city:', error);
            throw error;
        }
    }
};

export { weatherService };
