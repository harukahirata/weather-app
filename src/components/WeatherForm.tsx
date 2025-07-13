import CityInput from "./CityInput";

type Props = {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: (city: string) => void;

  error: string;
};

const WeatherForm = ({ city, onCityChange, onSearch, error }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CityInput
          city={city}
          onCityChange={onCityChange}
          onSelect={onSearch}
        />
        <button
          onClick={() => onSearch(city)}
          style={{ padding: 8 }}
          type="submit"
        >
          検索
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default WeatherForm;
