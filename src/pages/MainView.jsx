// MainView será la página la cual el usuario al poner su geolocalización podrá ver el tiempo de su ciudad
import { useState, useEffect } from 'react';
import getWeatherIcon from '../data/IconsWeather';
import getTextWeather from '../data/TextWeather';
import "./stylesPages.css"

const API_KEY = '2c1994ae2a5bb37938dec5db0a0d95f5';

const MainView = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geolocationError, setGeolocationError] = useState(null);
  const [geolocationDenied, setGeolocationDenied] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error al obtener la geolocalización:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setGeolocationDenied(true);
          } else {
            setGeolocationError("Hubo un error al obtener la geolocalización.");
          }
        }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!coords) return;

      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('No se pudieron recuperar los datos meteorológicos');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error al obtener datos meteorológicos:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (coords) {
      getWeatherData();
    }
  }, [coords]);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <div className='container'>
      <h1>Qué tiempo hace en:</h1>
      {geolocationError && (
        <p>{geolocationError}</p>
      )}
      {geolocationDenied && (
        <p>Por favor, activa la geolocalización para usar la aplicación.</p>
      )}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) :
        <div className='target-weather-main-view'>
          <>
            {weatherData && (
              <>
                <h2>{weatherData.name}</h2>
                <p>{currentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><img src={getWeatherIcon(weatherData.weather[0].icon)} alt="weather-icon" /> {getTextWeather(weatherData.weather[0].icon)}</p>
                <p>Temperatura: {Math.round(weatherData.main.temp)}°C</p>
              </>
            )}
          </>
        </div>}
    </div>
  );
};

export default MainView;