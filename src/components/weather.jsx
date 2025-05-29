import { useState, useEffect } from "react";
import { useWeatherContext } from "../context/weatherContext";
import ResetButton from "./reset";
import FetchStatus from "./status";
import Forecast from "./forecast";

const Weather = () => {
  const { weatherData, error } = useWeatherContext();

  const [unit, setUnit] = useState(localStorage.getItem("tempUnit") || "C");

  if (!weatherData || error || weatherData.error) return null;

  const {
    location,
    weather,
    temp,
    imgUrl,
    humidity,
    windSpeed,
    forecast,
    time,
  } = weatherData;

  console.log(weatherData);

  const toggleUnit = () => {
    setUnit((prev) => {
      const newUnit = prev === "C" ? "F" : "C";
      localStorage.setItem("tempUnit", newUnit);
      return newUnit;
    });
  };

  const displayTemp = unit === "C" ? temp : ((temp * 9) / 5 + 32).toFixed(1);

  return (
    <div className="data flex flex-col items-center justify-center mt-6">
      <h1 className="text-3xl font-bold text-white p-2">
        Location: {location}
      </h1>
      {imgUrl && <img className="w-20 h-20" src={imgUrl} alt="weather icon" />}
      <h2 className="text-2xl font-bolder text-white p-1">Time: {time}</h2>
      <h2 className="text-2xl font-bolder text-white p-1">
        Weather: {weather}
      </h2>
      <h2 className="text-2xl font-bolder text-white p-1">
        Humidity: {humidity}%
      </h2>
      <h2 className="text-2xl font-bolder text-white p-1">
        Wind Speed: {windSpeed} m/s
      </h2>

      <h3 className="text-2xl font-bolder text-white p-1 flex items-center gap-2">
        Temp: {displayTemp}°{unit}
        <button
          onClick={toggleUnit}
          className="px-2 py-1 rounded-[10px] bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all text-sm font-semibold shadow-sm border border-white/20 cursor-pointer"
        >
          Switch to °{unit === "C" ? "F" : "C"}
        </button>
      </h3>

      {forecast && <Forecast forecast={forecast} unit={unit} />}

      <ResetButton />
      <FetchStatus />
    </div>
  );
};

export default Weather;
