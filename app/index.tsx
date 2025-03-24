import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";
import { useWeather } from "../hooks/useWeather";
import WeatherAnimation from "./components/WeatherAnimation";

// @ts-ignore
const HomeScreen = ({ navigation }) => {
  const tw = useTailwind();
  const { weather, loading, fetchWeather } = useWeather(37.7749, -122.4194); // Example: Latitude and Longitude for San Francisco

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={tw("flex-1 bg-skyblue p-4")}>
      {/* Top Navigation */}
      <View style={tw("flex-row justify-between mb-4")}>
        <TouchableOpacity onPress={() => navigation.navigate("location")}>
          <Ionicons name="location-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Weather Info */}
      {weather ? (
        <ScrollView>
          <View style={tw("items-center")}>
            <Text style={tw("text-5xl font-bold text-white text-shadow")}>{weather.current.temp}°C</Text>
            <WeatherAnimation condition={weather.current.weather[0].main} />
            <Text style={tw("text-lg text-white text-shadow")}>{weather.current.weather[0].description}</Text>
          </View>

          {/* Additional Weather Stats */}
          <View style={tw("mt-6 p-4 glass-bg")}>
            <Text style={tw("text-white text-lg")}>🌡️ Feels Like: {weather.current.feels_like}°C</Text>
            <Text style={tw("text-white text-lg")}>💨 Wind Speed: {weather.current.wind_speed} km/h</Text>
            <Text style={tw("text-white text-lg")}>☀️ UV Index: {weather.current.uvi}</Text>
            <Text style={tw("text-white text-lg")}>🌁 Visibility: {weather.current.visibility}m</Text>
          </View>
        </ScrollView>
      ) : (
        <Text style={tw("text-center text-lg text-white")}>Loading...</Text>
      )}
    </View>
  );
};

export default HomeScreen;
