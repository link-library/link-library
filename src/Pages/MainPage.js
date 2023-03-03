import React from 'react';

export const MainPage = ({ logout }) => {
  return (
    <div>
      <h1>MainPage</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MainPage;
