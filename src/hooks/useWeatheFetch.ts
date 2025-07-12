import { useCallback } from "react";
import { WeatherData } from "../types/weather";

export const useWeatherFetch = (
  setWeather: (data: WeatherData | null) => void,
  setError: (msg: string) => void,
  setLoading: (loading: boolean) => void
) => {
  return useCallback(
    async (city: string) => {
      const trimmedCity = city.trim();
      if (!trimmedCity) return;

      setError("");
      setWeather(null);
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    },
    [setWeather, setError, setLoading]
  );
};
