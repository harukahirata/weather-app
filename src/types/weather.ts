export type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
  };
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  dt?: number;
  coord?: {
    lon: number;
    lat: number;
  };
};