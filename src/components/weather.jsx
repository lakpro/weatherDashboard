import { useState, useEffect } from "react";
import { useWeatherContext } from "../context/weatherContext";
import ResetButton from "./reset";
import FetchStatus from "./status";

const WeatherInfo = () => {
  const { weatherData, error } = useWeatherContext();
  // Initialize unit state based on localStorage, default to "C"
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

      {forecast && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-2">5-Day Forecast</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-white/10 text-white p-3 w-[130px] rounded-lg flex flex-col items-center"
              >
                <p className="text-sm">
                  {new Date(day.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>{" "}
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="icon"
                  className="w-12 h-12"
                />
                <p>{day.weather}</p>
                <p className="font-bold">
                  {day.temp}°{unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ResetButton />
      <FetchStatus />
    </div>
  );
};

export default WeatherInfo;
