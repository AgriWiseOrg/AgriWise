// AgriWise App - Support System Updated [v2]
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// General Components
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import FrontPage from './components/FrontPage';
import MarketPrices from './components/MarketPrices';
import MyCrops from './components/MyCrops';
import GovtSchemes from './components/GovtSchemes';
import MarketPlace from './components/MarketPlace';
import Weather from './components/Weather';
import Support from './components/Support';
import BuyerSupport from './components/BuyerSupport';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

// Public Static Pages
import About from './components/About';
import Features from './components/Features';
import Privacy from './components/Privacy';
import Contact from './components/Contact';

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
            {/* Public Routes - Accessible to all */}
            <Route
              path="/login"
              element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />}
            />

            {/* Logic: If user is logged in, '/' goes to Dashboard (FrontPage).
                If NOT logged in, '/' goes to Landing Page. */}
            <Route
              path="/"
              element={user ? <FrontPage onLogout={handleLogout} /> : <LandingPage />}
            />

            {/* Public Page Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />

            {user ? (
              <>
                {/* Authenticated Routes */}
                <Route path="/market-prices" element={<MarketPrices />} />
                <Route path="/my-crops" element={<MyCrops user={user} />} />
                <Route path="/govt-schemes" element={<GovtSchemes />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/weather" element={<Weather />} />
                <Route
                  path="/support"
                  element={user.role === 'buyer' ? <BuyerSupport /> : <Support />}
                />

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
              /* Fallback for unauthenticated trying to access protected routes */
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;