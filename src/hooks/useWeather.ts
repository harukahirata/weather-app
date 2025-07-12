import { useState } from "react";
import { WeatherData } from "../types/weather";
import { useWeatherFetch } from "./useWeatheFetch";
import { useWeatherByLocation } from "./useWeatherByLocation";

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = useWeatherFetch(setWeather, setError, setLoading);
  const fetchWeatherByLocation = useWeatherByLocation(
    setWeather,
    setError,
    setLoading
  );

  return {
    city,
    setCity,
    weather,
    error,
    loading,
    fetchWeather,
    fetchWeatherByLocation,
  };
};
