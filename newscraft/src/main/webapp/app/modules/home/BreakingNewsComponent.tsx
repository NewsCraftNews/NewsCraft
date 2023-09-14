import React, { useState, useEffect, CSSProperties } from 'react';
import {getEntertainmentEntities} from "app/entities/news-article/news-article.reducer";
import {useAppDispatch, useAppSelector} from "app/config/store";

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
  margin: "10px",
  marginBottom: "20px",
};

const dotStyle: CSSProperties = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const BreakingNews: React.FC = () => {
  const dispatch =useAppDispatch();
  const newsArticleList =useAppSelector(state => state.newsArticle.entities);
  const loading = useAppSelector(state => state.newsArticle.loading);
//
//   useEffect(() => {
//     dispatch(getEntertainmentEntities());
//   }, []);

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

  // sets the newsData into slides component
  const slides = [
    {
      text: `${newsArticleList && newsArticleList[3] && newsArticleList[3].title ? newsArticleList[3].title : "Loading..."}`,
      title: "slide1",
      url: newsArticleList && newsArticleList[3] && newsArticleList[3].picture ? newsArticleList[3].picture.imageURL : '',
      link: `/article/${newsArticleList && newsArticleList[3] && newsArticleList[3].id ? newsArticleList[3].id:""}`
    },
    {
      text: `${newsArticleList && newsArticleList[4] && newsArticleList[4].title ? newsArticleList[4].title : "Loading..."}`,
      title: "slide1",
      url: newsArticleList && newsArticleList[4] && newsArticleList[4].picture ? newsArticleList[4].picture.imageURL : '',
      link: `/article/${newsArticleList && newsArticleList[4] && newsArticleList[4].id ? newsArticleList[4].id: ""}`

    },
    {
      text: `${newsArticleList && newsArticleList[5] && newsArticleList[5].title ? newsArticleList[5].title : "Loading..."}`,
      title: "slide1",
      url: newsArticleList && newsArticleList[5] && newsArticleList[5].picture ? newsArticleList[5].picture.imageURL : '',
      link: `/article/${newsArticleList && newsArticleList[5] && newsArticleList[5].id ? newsArticleList[5].id: ""}`
    },
    {
      text: `${newsArticleList && newsArticleList[6] && newsArticleList[6].title ? newsArticleList[6].title : "Loading..."}`,
      title: "slide1",
      url: newsArticleList && newsArticleList[6] && newsArticleList[6].picture ? newsArticleList[6].picture.imageURL : '',
      link: `/article/${newsArticleList && newsArticleList[6] && newsArticleList[6].id ? newsArticleList[6].id: ""}`

    },
  ];

//Logic for slide method names explain actions
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

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
    fontSize: '30px', // Font size
    backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    border: '5px solid #333',
    // Background color behind text (e.g., semi-transparent black)
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

        < div style={slideStylesWithText} >
          <br/> <br/> <br/>
          <a href={slides[currentIndex].link} style={{color: 'white', opacity: 0.7}}>
            {slides[currentIndex].text}
          </a>
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
