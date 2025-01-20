import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiDayRain,
  WiNightAltRain,
  WiDaySnow,
  WiNightAltSnow,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiDayFog,
  WiNightFog,
  WiDayWindy,
  WiHumidity,
  WiBarometer,
  WiThermometer,
  WiRaindrops
} from 'react-icons/wi';

const WeatherIcon = ({ condition, isDay = true, size = 'text-4xl', className = '' }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return isDay ? WiDaySunny : WiNightClear;
      case 'partly-cloudy':
        return isDay ? WiDayCloudy : WiNightAltCloudy;
      case 'cloudy':
        return WiCloudy;
      case 'overcast':
        return WiCloud;
      case 'rain':
      case 'drizzle':
        return isDay ? WiDayRain : WiNightAltRain;
      case 'snow':
        return isDay ? WiDaySnow : WiNightAltSnow;
      case 'thunderstorm':
        return isDay ? WiDayThunderstorm : WiNightAltThunderstorm;
      case 'fog':
      case 'mist':
        return isDay ? WiDayFog : WiNightFog;
      case 'windy':
        return WiDayWindy;
      case 'humidity':
        return WiHumidity;
      case 'pressure':
        return WiBarometer;
      case 'temperature':
        return WiThermometer;
      case 'precipitation':
        return WiRaindrops;
      default:
        return isDay ? WiDaySunny : WiNightClear;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className={`${size} ${className} transition-transform duration-200 hover:scale-110`}>
      <IconComponent className="w-full h-full" />
    </div>
  );
};

export default WeatherIcon;
