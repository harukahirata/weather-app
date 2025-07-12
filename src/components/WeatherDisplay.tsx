import { WeatherData } from "../types/weather";

type Props = {
  weather: WeatherData;
};

const WeatherDisplay = ({ weather }: Props) => (
  <div style={{ marginTop: 24 }}>
    <h2>{weather.name}の天気</h2>
    <p>気温：{weather.main.temp}℃</p>
    <p>天気：{weather.weather[0].description}</p>
    <p>湿度：{weather.main.humidity}%</p>
    <p>風速：{weather.wind.speed}m/s</p>
  </div>
);

export default WeatherDisplay;
