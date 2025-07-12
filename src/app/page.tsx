"use client";

import { useState, useEffect } from "react";
import "../styles/weather.css";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
};

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const fetchWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setError("");
    setWeather(null);

    try {
      // Geocoding APIで緯度経度を取得
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          trimmedCity
        )}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      if (!geoRes.ok) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const geoData = await geoRes.json();

      if (!geoData.length) {
        throw new Error("都市が見つかりませんでした");
      }
      const { lat, lon, name, local_names } = geoData[0];
      const cityName = local_names?.ja || name;

      // 天気情報を取得
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );

      if (!weatherRes.ok) {
        throw new Error("天気予報が取得できませんでした");
      }

      const weatherData = await weatherRes.json();
      weatherData.name = cityName;
      setWeather(weatherData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("エラーが発生しました");
      }
    }
  };

  const fetchWeatherByLocation = () => {
    setError("");
    setWeather(null);

    if (!navigator.geolocation) {
      setError("位置情報が取得できません");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );

        if (!res.ok) {
          throw new Error("天気情報の取得に失敗しました");
        }
        const data = await res.json();
        setWeather(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("エラーが発生しました");
        }
      }
    });
  };

  return (
    <main style={{ padding: 32 }}>
      <h1>天気予報アプリ</h1>

      <div>
        <input
          type="text"
          placeholder="地名を入力(例:東京)"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button onClick={fetchWeather} style={{ padding: 8 }}>
          検索
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <button onClick={fetchWeatherByLocation}>現在地で調べる</button>
      {weather && (
        <div style={{ marginTop: 24 }}>
          <h2>{weather.name}の天気</h2>
          <p>気温：{weather.main.temp}℃</p>
          <p>天気：{weather.weather[0].description}</p>
          <p>湿度：{weather.main.humidity}%</p>
          <p>風速：{weather.wind.speed}m/s</p>
        </div>
      )}
    </main>
  );
};

export default Home;
