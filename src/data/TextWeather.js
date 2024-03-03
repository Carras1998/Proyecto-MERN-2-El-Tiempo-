const getTextWeather = (weatherCode) => {
  const weatherTexts = {
    '01d': 'Soleado',
    '01n': 'Soleado',
    '02d': 'Nubes y sol',
    '02n': 'Nubes y sol',
    '03d': 'Nubes dispersas',
    '03n': 'Nubes dispersas',
    '04d': 'Nublado',
    '04n': 'Nublado',
    '09d': 'Lluvia ligera',
    '09n': 'Lluvia ligera',
    '10d': 'Lluvia',
    '10n': 'Lluvia',
    '11d': 'Tormenta',
    '11n': 'Tormenta',
    '13d': 'Nieve',
    '13n': 'Nieve',
    '50d': 'Niebla',
    '50n': 'Niebla',
  };
  return weatherTexts[weatherCode] || 'No tenemos datos 😢';
};

export default getTextWeather;
