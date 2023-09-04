// WeatherApp.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
const slideStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const rightArrowStyles: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#aaa",
    zIndex: 1,
    cursor: "pointer",
};

const textStyle = {
    position: "center",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#aaa",
    zIndex: 1,
    cursor: "pointer",
};

const leftArrowStyles: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#aaa",
    zIndex: 1,
    cursor: "pointer",
};

const sliderStyles: CSSProperties = {
    position: "relative",
    height: "100%",
};

const dotsContainerStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
};

const dotStyle: CSSProperties = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
};

const WeatherApp: React.FC = () => {
    const containerStyles = {
        width: "600px",
        height: "200px",
        margin: "0 auto",
    };
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



    let slides = [
        {
            text: `Temperature: ${weatherData ? weatherData.main.temp : "Loading..."}°K`,
            title: "slide1",
            url: "https://clipart-library.com/img1/798831.png",
        },
        {
            text: `Weather: ${weatherData ? weatherData.weather[0].description : "Loading..."}`,
            title: "slide2",
            url: "http://localhost:3000/image2.png",
        },
    ];


    const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    function handleClick() {
        // Redirect to the desired URL
        if(currentIndex==5){
            window.location.href = 'https://codepen.io/gaearon/pen/gWWZgR?editors=0010';
        }
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };
    const slideStylesWidthBackground = {
        ...slideStyles,
        color: 'black', // Text color
        fontSize: '16px', // Font size
    };
    const slideStylesWithText = {
        ...slideStyles,
        color: 'black', // Text color
        fontSize: '16px', // Font size
        backgroundImage: `url(${slides[currentIndex].url})`,
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
    };



    return (
        <div style={containerStyles}>
        <div style={sliderStyles}>
            <div>
                <div onClick={goToPrevious} style={leftArrowStyles}>
                    ❰
                </div>
                <div onClick={goToNext} style={rightArrowStyles}>
                    ❱
                </div>
            </div>

            <div style={slideStylesWithText} onClick={handleClick}>
                {slides[currentIndex].text}
            </div>

            <div style={dotsContainerStyles}>
                {slides.map((slide: any, slideIndex: React.Key) => (
                    <div
                        style={dotStyle}
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        ●
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default WeatherApp;
