// script.js
const apiKey = "a01f23efd7e0958fa50ee13dd782473c";
const searchBox = document.querySelector("#city");
const searchButton = document.querySelector("#search");
const weatherContainer = document.querySelector("#weather");

document.addEventListener("DOMContentLoaded", () => {
  getWeather("Bhopal"); // Default city
});

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 404) {
      alert("City not found! Please try again.");
      return;
    }

    // Display weather details
    weatherContainer.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${Math.round(data.main.temp)}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} km/h</p>
      <p>🌤️ Condition: ${data.weather[0].main} - ${data.weather[0].description}</p>
    `;

    // Change background based on weather
    changeBackground(data.weather[0].main.toLowerCase());

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please try again later.");
  }
}

function changeBackground(weatherType) {
  let bgImage = "images/default.jpg"; // Default background

  const backgrounds = {
    "clear": "images/sunny.jpg",
    "clouds": "images/cloudy.jpg",
    "overcast": "images/cloudy.jpg",
    "rain": "images/rainy.jpg",
    "drizzle": "images/rainy.jpg",
    "snow": "images/snowy.jpg",
    "thunderstorm": "images/storm.jpg",
    "mist": "images/foggy.jpg",
    "fog": "images/foggy.jpg",
    "haze": "images/foggy.jpg",
    "smoke": "images/foggy.jpg",
    "squall": "images/storm.jpg",
    "tornado": "images/storm.jpg"
  };

  for (const condition in backgrounds) {
    if (weatherType.includes(condition)) {
      bgImage = backgrounds[condition]; // Assign correct background
      break;
    }
  }

  // Debugging logs
  console.log("Weather Type:", weatherType);
  console.log("Applying Background:", bgImage);

  // Apply background
  document.body.style.background = `url('${bgImage}') no-repeat center center/cover`;

  // Check if image exists
  const img = new Image();
  img.src = bgImage;
  img.onerror = () => console.error("Image not found:", bgImage);
}


