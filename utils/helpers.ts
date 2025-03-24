export const searchLocation = async (query: string) => {
    const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching location:", error);
      return [];
    }
  };
  