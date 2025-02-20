import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import drizzle_icon from '../assets/drizzle.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

 {/* help reset git cache */}
const Weather = () => {

  const inputRef = useRef()

   const [weatherData, setWeatherData] = useState(false);

   const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

   }

   const search = async (city)=>{

   if(city === ""){
    alert("Please enter a city name");
    return;
   }

    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;



      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon : icon 
      })
    }
    catch(error){

    }
   }


  useEffect(() => {
    search("New York")
  }, [
  ])

  return (
    <div className="weather">
      <div className="weather__search">
        <input ref={inputRef} type = "text" placeholder="Search" />
        <img src={search_icon} alt="magnifying glass" className = "searchIcon" onClick={()=>search(
          inputRef.current.value
        )
      }/>
      </div>

      <img src={weatherData.icon} alt="clear weather" className="weather__icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="secondaryWeatherInfo">
        <div className = "column">
          <img src={humidity_icon} alt="humidity icon" />
          <span className = "weatherData" >{weatherData.humidity}%</span>
          <span className = "weatherData"> Humidity </span>
        </div>
        <div className = "column">
          <img src={wind_icon} alt="wind icon" />
          <span className = "weatherData">{weatherData.wind} km/h</span>
          <span className = "weatherData"> Wind Speed </span>
        </div>
      </div>
    </div>
  )
}

export default Weather


