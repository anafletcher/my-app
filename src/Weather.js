import React, { useState } from "react";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [loaded, setLoaded] = useState(false);

  function updateWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: response.data.weather[0].icon,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "bf54175800a55e59e6c4d6461deeef12";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(updateWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
            />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        {form}

        <h2>Loading weather</h2>
        <SyncLoader color="white" size={15} />
      </div>
    );
  }
}
