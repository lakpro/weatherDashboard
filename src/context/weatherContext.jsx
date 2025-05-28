// src/context/WeatherContext.js
import { createContext, useContext } from "react";
import { useWeather } from "../hooks/useWeather";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const weather = useWeather();
  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);
