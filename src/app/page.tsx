"use client";

import WeatherForm from "../components/WeatherForm";
import WeatherDisplay from "../components/WeatherDisplay";
import CurrentLocationButton from "../components/CurrentLocationButton";
import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import "../styles/weather.css";

const Home = () => {
  const {
    city,
    setCity,
    weather,
    error,
    fetchWeather,
    fetchWeatherByLocation,
  } = useWeather();

  useEffect(() => {
    fetchWeatherByLocation();
  }, [fetchWeatherByLocation]);

  return (
    <main style={{ padding: 32 }}>
      <h1>天気予報アプリ</h1>

      <WeatherForm
        city={city}
        onCityChange={setCity}
        onSearch={fetchWeather}
        error={error}
      />
      <CurrentLocationButton onClick={fetchWeatherByLocation} />
      {weather && <WeatherDisplay weather={weather} />}
    </main>
  );
};

export default Home;
