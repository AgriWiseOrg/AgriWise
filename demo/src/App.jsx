import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all your components
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import MarketPrices from './components/MarketPrices';
import MyCrops from './components/MyCrops';
import GovtSchemes from './components/GovtSchemes';
import MarketPlace from './components/MarketPlace';
import Weather from './components/Weather';
import Suppport from './components/Suppport'; // Kept the typo to match your file name

function App() {
  // Renamed to 'user' for clarity, but 'isLoggedIn' logic can be derived from it.
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <main className="antialiased text-gray-900">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />}
          />

          {/* Protected Routes - Only accessible if logged in */}
          {user ? (
            <>
              <Route path="/" element={<FrontPage />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/my-crops" element={<MyCrops user={user} />} />
              <Route path="/govt-schemes" element={<GovtSchemes />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/support" element={<Suppport />} />
            </>
          ) : (
            /* Redirect any unknown route to login if not authenticated */
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;