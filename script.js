let currentWeatherData = null; // Store API response globally

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "a5f252bf2f094225947170708252004";

  if (city === "") {
    alert("Please enter a city or country name.");
    return;
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // For debugging

      if (data.error) {
        document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">⚠️ ${data.error.message}</p>`;
        return;
      }

      currentWeatherData = data;

      updateTemperature();

      document.getElementById("condition").innerText = `Condition: ${data.current.condition.text}`;
      document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;

      const aqiIndex = data.current.air_quality["us-epa-index"];
      document.getElementById("air-quality").innerText = `Air Quality: ${getAQILevel(aqiIndex)}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">❌ Unable to fetch data.</p>`;
    });
}

function updateTemperature() {
  if (!currentWeatherData) return;

  const isCelsius = document.getElementById("unitToggle").value === "C";
  const temp = isCelsius
    ? currentWeatherData.current.temp_c + "°C"
    : currentWeatherData.current.temp_f + "°F";

  document.getElementById("temp").innerText = temp;
}

function getAQILevel(index) {
  const levels = {
    1: "Good 😊",
    2: "Moderate 😐",
    3: "Unhealthy for Sensitive Groups 😷",
    4: "Unhealthy 😷",
    5: "Very Unhealthy 😫",
    6: "Hazardous ☠️",
  };
  return levels[index] || "Unknown";
}
