import React, { useState } from 'react'

const api = {
  key: '7b26e7b383af27d1169ebff362c62d15',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = async event => {
    if (event.key === 'Enter') {
      const result = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      )
      const weather = await result.json()
      setQuery('')
      setWeather(weather)
    }
  }

  const dateBuilder = date => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const day = days[date.getDay()]
    const convertedDate = date.getDate()
    const month = months[date.getMonth() - 1]
    const year = date.getFullYear()

    return `${day} ${convertedDate} ${month} ${year}`
  }

  return (
    <div
      className={
        weather.main ? (weather.main.temp < 16 ? 'app cold' : 'app') : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='City name here (London, GB)'
            onChange={event => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
