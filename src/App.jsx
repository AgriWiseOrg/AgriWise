import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// General Components
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import MarketPrices from './components/MarketPrices';
import MyCrops from './components/MyCrops';
import GovtSchemes from './components/GovtSchemes';
import MarketPlace from './components/MarketPlace';
import Weather from './components/Weather';
import Suppport from './components/Suppport';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

// Epic 6: Govt Schemes Subpages - Split into Admin/Farmer
import FarmingTipsAdmin from './components/GovtSchemes/FarmingTips_admin';
import FarmingTipsFarmer from './components/GovtSchemes/FarmingTips_farmer';
import LatestUpdatesAdmin from './components/GovtSchemes/LatestUpdates_admin';
import LatestUpdatesFarmer from './components/GovtSchemes/LatestUpdates_farmer';
import SchemeListAdmin from './components/GovtSchemes/SchemeList_admin';
import SchemeListFarmer from './components/GovtSchemes/SchemeList_farmer';

// RBAC Components
import FinanceAdmin from './components/GovtSchemes/Finance_admin';
import FinanceFarmer from './components/GovtSchemes/Finance_farmer';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('agriwise_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('agriwise_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agriwise_user');
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center font-bold">Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <main className="antialiased text-gray-900">
          <Routes>
            <Route
              path="/login"
              element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />}
            />

            {user ? (
              <>
                {/* Main Routes */}
                <Route path="/" element={<FrontPage onLogout={handleLogout} />} />
                <Route path="/market-prices" element={<MarketPrices />} />
                <Route path="/my-crops" element={<MyCrops user={user} />} />
                <Route path="/govt-schemes" element={<GovtSchemes />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/support" element={<Suppport />} />

                {/* Govt Schemes Sub-Routes with Role Based Access */}
                <Route
                  path="/schemes/list"
                  element={user.role === 'admin' ? <SchemeListAdmin /> : <SchemeListFarmer user={user} />}
                />
                <Route
                  path="/schemes/tips"
                  element={user.role === 'admin' ? <FarmingTipsAdmin /> : <FarmingTipsFarmer />}
                />
                <Route
                  path="/schemes/updates"
                  element={user.role === 'admin' ? <LatestUpdatesAdmin /> : <LatestUpdatesFarmer />}
                />
                <Route
                  path="/schemes/finance"
                  element={user.role === 'admin' ? <FinanceAdmin /> : <FinanceFarmer user={user} />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
// Version 7