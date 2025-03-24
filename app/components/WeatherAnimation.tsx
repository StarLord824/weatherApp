import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const WeatherAnimation = ({ condition }: { condition: string }) => {
  let animationSource;

  switch (condition) {
    case "Rain":
      animationSource = require("../../assets/animations/rain.json");
      break;
    case "Clear":
      animationSource = require("../../assets/animations/sunny.json");
      break;
    case "Clouds":
      animationSource = require("../../assets/animations/cloud.json");
      break;
    default:
      animationSource = require("../../assets/animations/sunny.json");
  }

  return (
    <View style={{ width: 150, height: 150 }}>
      <LottieView source={animationSource} autoPlay loop />
    </View>
  );
};

export default WeatherAnimation;
