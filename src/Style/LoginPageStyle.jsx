import styled from 'styled-components';
import loginBackground from '../images/logInBackground.png';
import LinkLibraryLogo from '../images/LinkLibraryLogo.png';
import LoginImage1 from '../images/LoginImage1.png';

const Logo = styled.img`
  width: 250px;
  height: 50px;
  align-self: flex-start;
`;

const LoginImg1 = styled.img`
  width: 240px;
  height: 200px;
  margin-top: 50px;
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
`;

export const Container = styled.div`
  width: 70vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
`;

export const Form1 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  padding-left: 30px;
`;

const ImgText = styled.span`
  text-align: center;
  margin-top: 10px;
  margin-right: 30px;
`;

export const ImgForm = () => {
  return (
    <>
      <Logo src={LinkLibraryLogo} alt="Link Library Logo" />
      <LoginImg1 src={LoginImage1} alt="LoginImage1" />
      <ImgText>
        자주 방문하는 웹사이트들을
        <br /> 효율적으로 관리하세요.
      </ImgText>
    </>
  );
};

export const Form2 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding-left: 20px;
`;

export const ElongatedButton = styled.button`
  position: relative;
  width: 50px;
  height: 20px;
  background-color: #f50057;
  border: none;
  border-radius: 10px;

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 3px;
  }

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 3px;
  }
`;
export const BottomMargin = styled.div`
  margin-bottom: 20px;
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
