import React, { Component } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import LoginImage1 from '../images/LoginImage1.png';
import cat2 from '../images/cat2.jpg';
import cat3 from '../images/cat3.jpg';

const LoginImg1 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  margin-left: 150px;
`;

const Cat2 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  margin-left: 150px;
`;

const Cat3 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  margin-left: 150px;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };
  return (
    <Container>
      <div className="carousel">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <LoginImg1 src={LoginImage1} alt="LoginImage1" />
          </div>
          <div>
            <Cat2 src={cat2} alt="cat2" />
          </div>
          <div>
            <Cat3 src={cat3} alt="cat2" />
          </div>
        </Slider>
      </div>
    </Container>
  );
};
export default SimpleSlider;
