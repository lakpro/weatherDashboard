import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORCAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
export const fetchWeatherData = async (cityName, unit = "metric") => {
  try {
    const [response, forecastRes] = await Promise.all([
      axios.get(`${BASE_URL}`, {
        params: { q: cityName, appid: API_KEY, units: unit },
      }),
      axios.get(`${FORCAST_URL}`, {
        params: { q: cityName, appid: API_KEY, units: unit },
      }),
    ]);

    //normal api call for weather
    const data = response.data;
    const icon = data.weather[0].icon;
    const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    //forcast upcoming 5 days
    const forecastData = forecastRes.data.list;

    // For now we take weather at 12pm otherwise we make our own algo and do something with avg etc.
    const dailyForecast = forecastData
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5); // 5 days

    // convert timezone to local time
    const timestamp = data.dt; // UTC timestamp (seconds)
    const timezoneOffset = data.timezone; // timezone offset in seconds

    // Local timestamp in milliseconds
    const localTimestamp = (timestamp + timezoneOffset) * 1000;
    const localDate = new Date(localTimestamp);

    // Options for formatting time in AM/PM format
    const options = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    const timeStr = localDate.toLocaleTimeString("en-US", options);

    return {
      location: data.name,
      time: timeStr,
      temp: data.main.temp,
      icon: icon,
      imgUrl: imgUrl,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      forecast: dailyForecast.map((item) => ({
        date: item.dt_txt.split(" ")[0],
        temp: item.main.temp,
        icon: item.weather[0].icon,
        weather: item.weather[0].main,
      })),
      error: false,
    };
  } catch (err) {
    if (!err.response) {
      // Network or offline error (no response received)
      return {
        error: true,
        cod: "NETWORK_ERROR",
        message: "Network error or no internet connection",
      };
    }

    // API responded with error status
    return {
      error: true,
      cod: err.response.data.cod || err.response.status,
      message:
        err.response.data.message ||
        "Something went wrong fetching weather data",
    };
  }
};
