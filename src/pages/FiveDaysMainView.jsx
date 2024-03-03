// FiveDaysMainView será la página la cual el usuario al poner su geolocalización podrá ver el tiempo de su ciudad y los próximos 5 días.
import { useState, useEffect } from 'react';
import getWeatherIcon from '../data/IconsWeather';
import getTextWeather from '../data/TextWeather';
import formatDate from '../data/FormatDate';
import "./stylesPages.css"

const API_KEY = '2c1994ae2a5bb37938dec5db0a0d95f5';

const FiveDaysMainView = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      setLoading(true);
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
          if (!response.ok) {
            throw new Error('No se pudieron recuperar los datos meteorológicos');
          }
          const data = await response.json();
          const nextFiveDaysData = data.list.filter((forecast, index) => index < 40 && index % 8 === 0);
          setWeatherData(nextFiveDaysData);
          setCityName(data.city.name);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error al obtener datos meteorológicos:", error);
        setError(error);
        setLoading(false);
      }
    };

    getLocationAndWeather();
  }, []);

  return (
    <div className='container'>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='target-weather'>
        {weatherData && (
          <>
            <h2>Previsión del tiempo para los próximos 5 días en {cityName}:</h2>
            <div className='target-weather-wo-tittle'>
              {weatherData.map((forecast, index) => (
                <div key={index} className={`weather-item-${String.fromCharCode(97 + index)}`}>
                  <h3>{formatDate(forecast.dt_txt)}</h3>
                  <p><img src={getWeatherIcon(forecast.weather[0].icon)} alt="weather-icon" /> {getTextWeather(forecast.weather[0].icon)}</p>
                  <p>Temperatura: {Math.round(forecast.main.temp)}°C</p>
                </div>
              ))}
            </div>
          </>

        )}
      </div>
    </div>
  );
};

export default FiveDaysMainView;
