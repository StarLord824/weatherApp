import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  MapPin,
  Settings,
  Thermometer,
  Wind,
  Droplets,
  Cloud,
} from "lucide-react-native";
import { useWeather } from "../hooks/useWeather";
import WeatherAnimation from "./components/WeatherAnimation";
import "../styles/weather.scss";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { weather, loading, fetchWeather, getWeatherDescription } = useWeather(
    37.7749,
    -122.4194
  );

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View className="flex-1 bg-skyblue p-4">
      {/* Top Navigation */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity onPress={() => navigation.navigate("location")}>
          <MapPin size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Settings size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Weather Info */}
      {weather ? (
        <ScrollView>
          <View className="items-center">
            <Text className="text-5xl font-bold text-white text-shadow">
              {Math.round(weather.current.temperature_2m)}°C
            </Text>
            <WeatherAnimation
              condition={getWeatherDescription(weather.current.weather_code)}
            />
            <Text className="text-lg text-white text-shadow">
              {getWeatherDescription(weather.current.weather_code)}
            </Text>
          </View>

          {/* Additional Weather Stats */}
          <View className="mt-6 p-4 glass-bg">
            <View className="flex-row items-center mb-2">
              <Thermometer size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg">
                Humidity: {weather.current.relative_humidity_2m}%
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Wind size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg">
                Wind Speed: {weather.current.wind_speed_10m} km/h
              </Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Droplets size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg">
                Precipitation: {weather.current.precipitation} mm
              </Text>
            </View>
            <View className="flex-row items-center">
              <Cloud size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg">
                Max/Min: {Math.round(weather.daily.temperature_2m_max[0])}°C /{" "}
                {Math.round(weather.daily.temperature_2m_min[0])}°C
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text className="text-center text-lg text-white">Loading...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
