import styled from 'styled-components';
import loginBackground from '../images/logInBackground.png';
import LinkLibraryLogo from '../images/LinkLibraryLogo.png';
import LoginImage1 from '../images/LoginImage1.png';
import { LoginSlider } from '../Components/LoginSlider';

const Logo = styled.img`
  width: 250px;
  height: 50px;
  align-self: flex-start;
`;

export const Background = styled.div`
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center;
  position: fixed;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

export const Container = styled.div`
  width: 70vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 90vw;
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 50px;
  }
`;

export const LoginBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
`;

export const Form1 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  padding-left: 30px;

  @media screen and (max-width: 768px) {
    padding-left: 0;
    margin-bottom: 30px;
  }
`;

export const ImgForm = () => {
  return (
    <>
      <Logo src={LinkLibraryLogo} alt="Link Library Logo" />
      <BottomMargin />
      <LoginSlider />
    </>
  );
};

export const Form2 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-left: 20px;

  @media screen and (max-width: 768px) {
    padding-left: 0;
    width: 100%;
  }
`;

export const BottomMargin = styled.div`
  margin-bottom: 5vh;
`;

export const Input = styled.input`
  height: 25px;
  width: 250px;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  background-color: #ced4da;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  height: 40px;
  background-color: #f50057;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #ff4081;
  }
`;
