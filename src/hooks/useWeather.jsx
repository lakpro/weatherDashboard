// src/hooks/useWeather.js
import { useEffect, useState, useCallback } from "react";
import { fetchWeatherData } from "../utils/api";

export const useWeather = (initialCity = "") => {
  const [city, setCity] = useState(
    initialCity || localStorage.getItem("lastCity") || ""
  );

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const resetWeather = () => {
    setWeatherData(null);
    setCity("");
    localStorage.setItem("lastCity", "");
    setLastUpdated(null);
  };

  const fetchWeather = useCallback(
    async (cityName = city) => {
      if (!cityName) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(cityName);
        setWeatherData(data);
        setCity(cityName);
        setLastUpdated(new Date());
        localStorage.setItem("lastCity", cityName);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    },
    [city]
  );

  // Poll every 30 seconds
  useEffect(() => {
    if (!city) return;
    fetchWeather(city);
    const interval = setInterval(() => fetchWeather(city), 30000);
    return () => clearInterval(interval);
  }, [city, fetchWeather]);

  return {
    city,
    setCity,
    weatherData,
    fetchWeather,
    error,
    lastUpdated,
    loading,
    resetWeather,
  };
};
