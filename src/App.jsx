import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="antialiased text-gray-900">
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <FrontPage />
      )}
    </main>
  );
}

export default App;