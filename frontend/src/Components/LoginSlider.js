import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import LoginImage1 from '../images/LoginImage1.png';
import cat2 from '../images/cat2.jpg';
import cat3 from '../images/cat3.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LoginImg1 = styled.img`
  width: 320px;
  height: 250px;
  margin-top: 50px;
`;

const Cat2 = styled.img`
  width: 320px;
  height: 240px;
  margin-top: 50px;
  /* padding-left: 330px; */
`;

const Cat3 = styled.img`
  width: 320px;
  height: 240px;
  margin-top: 50px;
  /* padding-left: 330px; */
`;

const ImgText = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const SlideContainer = styled.div`
  max-width: 320px;
  max-height: 240px;
  margin-bottom: 150px;
  justify-content: center;
  outline: none;
  .slick-slide > div {
    margin-right: 20px;
  }
`;

export const LoginSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
              <br />
              사진입니다.
            </ImgText>
          </div>
          <div>
            <Cat3 src={cat3} alt="cat2" />
            <ImgText>
              고양이3
              <br />
              사진입니다.
            </ImgText>
          </div>
        </Slider>
      </div>
    </SlideContainer>
  );
};
export default LoginSlider;
