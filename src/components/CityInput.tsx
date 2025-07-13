import { useState, useEffect } from "react";

type CitySuggestion = {
  name: string;
  country: string;
  local_names?: {
    ja?: string;
  };
};

type Props = {
  city: string;
  onCityChange: (value: string) => void;
  onSelect: (value: string) => void;
};

const CityInput = ({ city, onCityChange, onSelect }: Props) => {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (city.trim() === "") {
        setSuggestions([]);
        return;
      }

      const fetchSuggestions = async () => {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            `${city}`
          )}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data);
      };

      fetchSuggestions();
    }, 500); // 入力後0.5秒待ってからAPI呼び出し

    return () => clearTimeout(timeoutId);
  }, [city]);

  const handleSelect = (selectedName: string) => {
    onCityChange(selectedName);
    setSuggestions([]);
    onSelect(selectedName);
    setTimeout(() => onCityChange(""), 300);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="地名を入力"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        style={{ padding: 8 }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "black",
            border: "1px solid #ccc",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 10,
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.name}-${i}`}
              onClick={() => handleSelect(s.local_names?.ja || s.name)}
              style={{
                padding: 8,
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              {s.local_names?.ja || s.name} ({s.country})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityInput;
