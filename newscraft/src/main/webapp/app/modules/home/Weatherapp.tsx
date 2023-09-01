// WeatherApp.tsx
import React, { useState, useEffect } from 'react';

const WeatherApp: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '0821b299f5bd3f5a9ff121892bdf1fec';
        const city = 'Wilmington'; // Replace with the name of the city you want to get weather data for

        // Fetch weather data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.error('Error fetching weather data:', error));
    }, []);

    console.log(weatherData);

    return (
        <div>
            <h1>Weather App</h1>
            {weatherData ? (
                <div>
                    console.log
                    <p>City: {weatherData.name}</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};
export default WeatherApp;
