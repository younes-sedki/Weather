const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
