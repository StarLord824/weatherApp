import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { saveFavoriteLocation } from "../../config/firebase";
import { Ionicons } from "@expo/vector-icons";

// @ts-ignore
const LocationScreen = ({ navigation }) => {
  const tw = useTailwind();
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState(["New York", "London", "Tokyo", "Mumbai"]);

  // @ts-ignore
  const handleSaveLocation = async (location) => {
    await saveFavoriteLocation("user123", location);
    navigation.navigate("index");
  };

  return (
    <View style={tw("flex-1 p-4 bg-white")}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw("mb-4")}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <TextInput
        style={tw("border p-3 rounded-lg text-lg")}
        placeholder="Search for a city..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={locations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={tw("p-4 border-b")} onPress={() => handleSaveLocation(item)}>
            <Text style={tw("text-lg")}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LocationScreen;
