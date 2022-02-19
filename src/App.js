import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

const URL = "https://api.openweathermap.org/data/2.5/"
const API_KEY = "Your API key here"
const ICON_URL = "http://openweathermap.org/img/wn/"

function App() {

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0)
  const [feels_like, setFeels_like] = useState(0)
  const [weather, setWeather] = useState(null)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState("")
  const [isLoading, setIsLoading] = useState(true)



  function getWeather() {

    let results = document.getElementById("results")
    results.style.display = "block"
    const address = URL + "weather?q=" + city + "&units=metric&lang=fi&appid=" + API_KEY

    axios.get(address)
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setTemp(response.data.main.temp.toFixed(1))
        setFeels_like(response.data.main.feels_like.toFixed(1))
        setWind(response.data.wind.speed.toFixed(1))
        setWeather(response.data.weather[0].description)
        setIcon(ICON_URL + response.data.weather[0].icon + "@2x.png")
      }).catch(error => {
        alert("Kaupungin nimi ei toimi! Kokeile jotain muuta.")
        results.style.display = "none"
      })

  }

  if (isLoading) {
    return (
      <div>
        <h1>Hae kaupungin säätiedot</h1>
        <label>Anna kaupungin nimi:</label>
        <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
        <button onClick={getWeather}>Hae säätiedot</button>

        <div id="results">
          <p>Loading...</p>
        </div>

      </div>
    )
  }
  else {

    return (
      <div>
        <h1>Hae kaupungin säätiedot</h1>
        <label>Anna kaupungin nimi:</label>
        <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
        <button onClick={getWeather}>Hae säätiedot</button>

        <div id='results'>
          <p>Lämpötila: {temp} °C (Tuntuu kuin {feels_like} °C)</p>
          <p>Keli: {weather} <img src={icon}/></p>
          <p>Tuulennopeus: {wind} m/s</p>
        </div>

      </div>
    );
  }
}

export default App;
