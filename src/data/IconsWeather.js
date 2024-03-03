const getWeatherIcon = (weatherCode) => {
  const weatherIcons = {
    '01d': '/src/public/sol.png', // Sol
    '01n': '/src/public/sol.png', // Sol
    '02d': '/src/public/nubes_y_sol.png', // Nubes y sol
    '02n': '/src/public/nubes_y_sol.png', // Nubes y sol
    '03d': '/src/public/nubes_dispersas.png', // Nubes dispersas
    '03n': '/src/public/nubes_dispersas.png', // Nubes dispersas
    '04d': '/src/public/nubes.png', // Nubes
    '04n': '/src/public/nubes.png', // Nubes
    '09d': '/src/public/lluvia_ligera.png', // Lluvia ligera
    '09n': '/src/public/lluvia_ligera.png', // Lluvia ligera
    '10d': '/src/public/lluvia.png', // Lluvia
    '10n': '/src/public/lluvia.png', // Lluvia
    '11d': '/src/public/tormenta.png', // Tormenta
    '11n': '/src/public/tormenta.png', // Tormenta
    '13d': '/src/public/nieve.png', // Nieve
    '13n': '/src/public/nieve.png', // Nieve
    '50d': '/src/public/niebla.png', // Niebla
    '50n': '/src/public/niebla.png', // Niebla
  };
  return weatherIcons[weatherCode] || '/src/public/error.png';
};

export default getWeatherIcon;
