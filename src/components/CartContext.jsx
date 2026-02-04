import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Get current user - Moved inside the component to ensure it's reactive
  const savedUser = JSON.parse(localStorage.getItem('agriwise_user'));
  const userEmail = savedUser ? savedUser.email : null;

  // 2. Definitive Fetch Function
  // We use useCallback so we can call this from within other functions (like addToCart)
  const fetchCart = useCallback(async () => {
    if (!userEmail) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/cart/${userEmail}`);
      // Ensure we are setting an array even if the backend structure varies
      const items = response.data.items || response.data || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Error fetching cart from DB:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  // Initial load
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 3. Function to add item
  const addToCart = async (product) => {
    if (!userEmail) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      // POST to backend
      await axios.post("http://localhost:5001/api/cart/add", {
        email: userEmail,
        product: product
      });
      
      // CRITICAL: Re-fetch the cart data from the server to ensure UI is in sync with DB
      await fetchCart();
      alert(`${product.crop} added to basket!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // 4. Function to remove item
  const removeFromCart = async (productId) => {
    if (!userEmail) return;

    try {
      await axios.post("http://localhost:5001/api/cart/remove", {
        email: userEmail,
        productId: productId
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 5. Update quantity
  const updateQuantity = async (id, amount) => {
    if (!userEmail) return;

    // Local update for immediate UI response
    setCartItems(prev => prev.map(item => 
      item.productId === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));

    try {
      // We reuse the /add logic which increases quantity, or you can add a dedicated /update-quantity route
      await axios.post("http://localhost:5001/api/cart/add", {
        email: userEmail,
        product: { id } // Pass the ID to let backend find it
      });
      // Optionally re-fetch to ensure server-side sync
      // await fetchCart();
    } catch (error) {
      console.error("Quantity update failed:", error);
      fetchCart(); // Revert to server state on error
    }
  };

  // 6. Global Derived Stats
  const totalItems = Array.isArray(cartItems) 
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0) 
    : 0;

  const totalPrice = Array.isArray(cartItems) 
    ? cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0) 
    : 0;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalItems, 
      totalPrice,
      loading,
      fetchCart // Exporting this allows manual refresh
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};