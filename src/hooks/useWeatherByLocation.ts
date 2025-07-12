import { useCallback } from "react";
import { WeatherData } from "../types/weather";

export const useWeatherByLocation = (
  setWeather: (data: WeatherData | null) => void,
  setError: (msg: string) => void
) => {
  return useCallback(() => {
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
  }, [setWeather, setError]);
};
