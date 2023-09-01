

import React, {useState, useEffect, CSSProperties} from 'react';

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


const WeatherSlider = ({ slides }) => {
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
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    return (
        <div style={sliderStyles}>
            <div>
                <div onClick={goToPrevious} style={leftArrowStyles}>
                    ❰
                </div>
                <div onClick={goToNext} style={rightArrowStyles}>
                    ❱
                </div>
            </div>

            <div style={slideStylesWidthBackground} onClick={handleClick}>

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

export default WeatherSlider;
