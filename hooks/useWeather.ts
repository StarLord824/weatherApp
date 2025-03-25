import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "@react-native-firebase/firestore";

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}

const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return weatherCodes[code] || "Unknown";
};

export const useWeather = (latitude: number, longitude: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveFavoriteLocation = async (
    userId: string,
    location: { name: string; lat: number; lon: number }
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists) {
        await setDoc(
          userRef,
          {
            favorites: [...(userDoc.data()?.favorites || []), location],
          },
          { merge: true }
        );
      } else {
        await setDoc(userRef, {
          favorites: [location],
        });
      }
    } catch (err) {
      console.error("Error saving favorite location:", err);
      throw err;
    }
  };

  const getFavoriteLocations = async (userId: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      return userDoc.exists ? userDoc.data()?.favorites || [] : [];
    } catch (err) {
      console.error("Error getting favorite locations:", err);
      return [];
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    saveFavoriteLocation,
    getFavoriteLocations,
    getWeatherDescription,
  };
};
