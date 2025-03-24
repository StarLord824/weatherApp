import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Ionicons } from "@expo/vector-icons";

// @ts-ignore
const SettingsScreen = ({ navigation }) => {
  const tw = useTailwind();
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={tw("flex-1 p-4 bg-white")}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw("mb-4")}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={tw("flex-row justify-between p-3 border-b")}>
        <Text style={tw("text-lg")}>Enable Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={tw("flex-row justify-between p-3 border-b mt-3")}>
        <Text style={tw("text-lg")}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
};

export default SettingsScreen;
