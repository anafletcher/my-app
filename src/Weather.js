import React from "react";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

export default function Weather(props) {
  function updateWeather(response) {
    alert(
      `The weather in ${response.data.name} is ${Math.round(
        response.data.main.temp
      )}C`
    );
  }

  let apiKey = "bf54175800a55e59e6c4d6461deeef12";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
  return (
    <div>
      <h2>Loading {props.city} weather</h2>
      <SyncLoader color="white" size={15} />
    </div>
  );
}
