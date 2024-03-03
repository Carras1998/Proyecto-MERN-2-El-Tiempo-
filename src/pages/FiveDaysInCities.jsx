// FiveDaysInCities será la página la cual el usuario al poner la ciudad seleccionada podrá ver el tiempo de su ciudad y los próximos 5 días.
import { useState, useEffect } from 'react';
import getWeatherIcon from '../data/IconsWeather';
import getTextWeather from '../data/TextWeather';
import formatDate from '../data/FormatDate';
import "./stylesPages.css"

const API_KEY = '2c1994ae2a5bb37938dec5db0a0d95f5';

const FiveDaysInCities = () => {
  const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao'];

  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      const getWeatherData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric`);
          if (!response.ok) {
            throw new Error('No se pudieron recuperar los datos meteorológicos');
          }
          const data = await response.json();
          const nextFiveDaysData = data.list.filter((forecast, index) => index < 40 && index % 8 === 0);
          setWeatherData(nextFiveDaysData);
        } catch (error) {
          console.error("Error al obtener datos meteorológicos:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      getWeatherData();
    }
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };


  return (
    <div className='container'>
      <h1>Previsión para los próximos 5 días en {selectedCity}:</h1>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">Selecciona una ciudad</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='target-weather'>
        {weatherData && (
          <>
            <div className='target-weather-wo-tittle'>
              {weatherData.map((forecast, index) => (
                <div key={index} className={index}>
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

export default FiveDaysInCities;
