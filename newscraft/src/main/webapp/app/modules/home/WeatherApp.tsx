// WeatherApp.tsx
import React, { useState, useEffect, CSSProperties } from 'react';
const slideStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  borderRadius: "0px",
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
  paddingLeft: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

const divStyle: CSSProperties = {
  width: "200px",
  height: "200px",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
};

const dotStyle: CSSProperties = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const WeatherApp: React.FC = () => {

  const containerStyles = {
    width: "200%",
    height: "200px",
    margin: "0 auto 0 0",
    // Set a fixed height for the slide container
    overflow: 'auto',
    backgroundColor: '#333',
    // Add a border
    border: '2px solid #333',
    borderRadius: '10px',
  };
  const [weatherData, setWeatherData] = useState<any>(null);
  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = '0821b299f5bd3f5a9ff121892bdf1fec';
    const city = 'Wilmington'; // Replace with the name of the city you want to get weather data for

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=39.7459&lon=-75.5466&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  console.log(weatherData);


  const kelvinToCelsius = (kelvin) => ((kelvin - 273.15)*9/5 +32 ).toFixed(2);
  let slides = [
    {
      text: `Temperature: ${weatherData ? kelvinToCelsius(weatherData.main.temp) : "Loading..."}°F`,
      title: "slide1",
      url: "https://t3.ftcdn.net/jpg/02/50/08/68/360_F_250086872_srlXRqANYR2IbNfIylRDc3eMO9MinjnV.jpg",
    },
    {
      text: `Weather: ${weatherData ? weatherData.weather[0].description : "Loading..."}`,
      title: "slide2",
      url: "https://media.istockphoto.com/id/162428248/photo/cloudscape.jpg?s=612x612&w=0&k=20&c=9yNkLzvPtJouuJw7XRuvKQ0rD9Dh_UksrKKlvtEpKMg=",
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
    color: 'white', // Text color
    fontSize: '24px', // Font size
    backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
  };



  //returns component
  return (
    <div style={divStyle}>

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

          <div style={slideStylesWithText} >
            {slides[currentIndex].text}
            <br/> <br/> <br/> <br/> <br/>

          </div>
        </div>
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
  );
};

export default WeatherApp;
