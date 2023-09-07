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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

const divStyle: CSSProperties = {
  width: "600px",
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

const BreakingNews: React.FC = () => {

  const containerStyles = {
    width: "600px",
    height: "200px",
    margin: "0 auto 0 0",
    // Set a fixed height for the slide container
    overflow: 'auto',
    backgroundColor: '#333',
     // Add a border
    border: '2px solid #333',
    borderRadius: '10px',
  };


  const [newsData, setNewsData] = useState<any>(null);
  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'pub_28913a8dcc770b2edef6b4b77131ecbf52201';


    // Fetch weather data from OpenWeatherMap API
    fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&country=us&timeframe=48&category=top,world`)

      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  console.log(newsData);



  const slides = [
    {
      text: `Title: ${newsData ? newsData.results[1].title : "Loading..."}`,
      title: "slide1",
      url: "https://media.istockphoto.com/id/1183338499/vector/0547.jpg?s=612x612&w=0&k=20&c=yNkIf4DxCEkOb0EXoq5kQ0XX1k5T53QYQLgL_j2Rg5M=",
      text2: `Content: ${newsData ? newsData.results[1].description : "Loading..."}`,
    },
    {
      text: `Title: ${newsData ? newsData.results[2].title : "Loading..."}`,
      title: "slide1",
      url: "https://media.istockphoto.com/id/1183338499/vector/0547.jpg?s=612x612&w=0&k=20&c=yNkIf4DxCEkOb0EXoq5kQ0XX1k5T53QYQLgL_j2Rg5M=",
      text2: `Content: ${newsData ? newsData.results[2].description : "Loading..."}`,
    },
    {
      text: `Title: ${newsData ? newsData.results[3].title : "Loading..."}`,
      title: "slide1",
      url: "https://media.istockphoto.com/id/1183338499/vector/0547.jpg?s=612x612&w=0&k=20&c=yNkIf4DxCEkOb0EXoq5kQ0XX1k5T53QYQLgL_j2Rg5M=",
      text2: `Content: ${newsData ? newsData.results[3].description : "Loading..."}`,
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

  const slideStylesWithText = {
    ...slideStyles,
    color: 'white', // Text color
    fontSize: '24px', // Font size
    backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    border: '5px solid #333',
  };



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

        <div style={slideStylesWithText} onClick={handleClick}>
          {slides[currentIndex].text}
          <br/> <br/> <br/> <br/> <br/>
          {slides[currentIndex].text2}
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

export default BreakingNews;
