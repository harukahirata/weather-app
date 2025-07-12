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
        <input
          type="text"
          placeholder="東京,大阪,福岡"
          value={city}
          onChange={(e) => onCityChange(e.currentTarget.value)}
          style={{ padding: 8, marginRight: 8 }}
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
