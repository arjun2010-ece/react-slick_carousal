import React from 'react';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const App = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        fade: true,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1
      };
    return (
        <div style={{ border: "1px solid", fontSize: "25px"}}>
            <Slider {...settings}>
                <div className="slide-container">
                    <div className="slide-item">
                        <p>We’re connecting distributors with more ways to deepen customer relationships.</p>
                    </div>
                </div>
                
                <div className="slide-container">
                    <div className="slide-item">
                        <p>We’re connecting insurers with an ecosystem to help businesses thrive.</p>
                    </div>
                </div>
                <div className="slide-container">
                    <div className="slide-item">
                        <p>We’re connecting customers with more ways to protect the things they value.</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}
export default App;