import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from './atoms';
import { MainPage } from './Pages/MainPage';
import { LoginPage } from './Pages/LoginPage';
import { RegistrationPage } from './Pages/RegitrationPage';

const App = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
