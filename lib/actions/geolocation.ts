export async function getLocation(): Promise<string> {
  const API_URL = "https://nominatim.openstreetmap.org/reverse";
  const API_LANGUAGE = "pl";

  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `${API_URL}?format=json&lat=${latitude}&lon=${longitude}&accept-language=${API_LANGUAGE}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch location data.");
          }
          const data = await response.json();
          let cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            data.address.state ||
            data.address.country ||
            "Unknown";

          // Handle edge cases
          if (cityName === "Wola Grzymalina-Kolonia") {
            cityName = "Kleszczów";
          }

          resolve(cityName);
        } catch (error) {
          reject(`Error fetching location data: ${error}`);
        }
      },
      (error) => {
        reject(`Error retrieving location: ${error.message}`);
      },
    );
  });
}
