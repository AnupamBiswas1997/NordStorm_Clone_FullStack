import React, { useState, useEffect, useRef } from "react";
import Content2Img1 from "../assets/Slide1.PNG";
import Content2Img2 from "../assets/Slide2.PNG";
import Content2Img3 from "../assets/Slide3.PNG";
import "../styles/slider.css"; // Import scoped CSS

const images = [Content2Img1, Content2Img2, Content2Img3];

export function ContentX0() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgHeight, setImgHeight] = useState("auto");
  const imgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (imgRef.current) {
      setImgHeight(`${imgRef.current.clientHeight}px`);
    }
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="contentX0-slider" style={{ height: imgHeight }}>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} ref={imgRef} />

      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
