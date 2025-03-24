import { useState, useEffect } from "react";

const API_URL = "https://api.open-meteo.com/v1/forecast";

interface Weather {
  current: {
    temp: number;
    feels_like: number;
    wind_speed: number;
    uvi: number;
    visibility: number;
    weather: { main: string; description: string }[];
  };
}

export const useWeather = (latitude: number, longitude: number) => {
  const [weather, setWeather] = useState< Weather | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return { weather, loading, fetchWeather };
};
