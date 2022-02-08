import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "3dc7d49c3ac2cbba7fc993b57a40c7c1"

function App() {

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null)
  const [feels_like, setFeels_like] = useState(null)
  const [weather, setWeather] = useState(null)
  const [wind, setWind] = useState(null)


  function getWeather() {

    let results = document.getElementById("results")
    results.style.display = "block"
    const address = URL + "weather?q=" + city + "&units=metric&lang=fi&appid=" + API_KEY

    axios.get(address)
      .then((response) => {
        console.log(response.data)
        setTemp(response.data.main.temp)
        setFeels_like(response.data.main.feels_like)
        setWind(response.data.wind.speed)
        setWeather(response.data.weather[0].description)
      }).catch(error => {
        alert("Kaupungin nimi ei toimi! Kokeile jotain muuta.")
      })

  }

  return (
    <div>
      <h1>Hae kaupungin säätiedot</h1>
      <label>Anna kaupungin nimi:</label>
      <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
      <button onClick={getWeather}>Hae säätiedot</button>

      <div id='results'>
        <p>Lämpötila: {temp} °C (Tuntuu kuin {feels_like} °C)</p>
        <p>Keli: {weather}</p>
        <p>Tuulennopeus: {wind} m/s</p>
      </div>

    </div>
  );
}

export default App;
