import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import LoginImage1 from '../images/LoginImage1.png';
import cat2 from '../images/cat2.jpg';
import cat3 from '../images/cat3.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginImg1 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  padding-left: 330px;
`;

const Cat2 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  padding-left: 330px;
`;

const Cat3 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
  padding-left: 330px;
`;

const ImgText = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SlideContainer = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

export const LoginSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SlideContainer>
      <div className="carousel">
        <Slider {...settings}>
          <div>
            <LoginImg1 src={LoginImage1} alt="LoginImage1" />
            <ImgText>
              자주 방문하는 웹사이트들을
              <br /> 효율적으로 관리하세요.
            </ImgText>
          </div>
          <div>
            <Cat2 src={cat2} alt="cat2" />
            <ImgText>
              고양이2
              <br /> 사진입니다.
            </ImgText>
          </div>
          <div>
            <Cat3 src={cat3} alt="cat2" />
            <ImgText>
              고양이3
              <br /> 사진입니다.
            </ImgText>
          </div>
        </Slider>
      </div>
    </SlideContainer>
  );
};
export default LoginSlider;
