import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './atoms';
import { MainPage } from './Pages/MainPage';
import { LoginPage } from './Pages/LoginPage';
import { RegistrationPage } from './Pages/RegitrationPage';
import { SimpleSlider } from './Pages/SlidePage';
import AsyncTest from './Pages/AsyncTest';
import AsyncTest2 from './Pages/AsyncTest2';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (storedIsLoggedIn != null) {
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, [setIsLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<RegistrationPage />} />
        <Route path="/test" element={<AsyncTest />} />
        <Route path="/test2" element={<AsyncTest2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
