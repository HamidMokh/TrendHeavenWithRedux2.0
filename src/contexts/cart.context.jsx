import { count } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";





// Function to add an item to the cart

export const addCartItem = (cartItems, productToAdd, count) => {
  // Find the index of the existing item in the cart
  const existingCartItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If the item exists in the cart
  if (existingCartItemIndex !== -1) {
    // Create a copy of the cart items array
    const updatedCartItems = [...cartItems];
    // Increment the quantity of the existing item
    updatedCartItems[existingCartItemIndex].quantity += 1;
    // Return the updated cart items
    return updatedCartItems;
  }
  // If the item does not exist in the cart
  // Add the item with a quantity of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];

};




// Create the CartContext with initial values

export const CartContext = createContext({
  isCartOpen: false,           // Initial state: Cart is closed
  setIsCartOpen: () => {},     // Function placeholder to set cart state
  cartItems: [],               // Initial state: Cart is empty
  addItemToCart: () => {},     // Function placeholder to add item to cart
  cartCount :0
  });






// CartProvider component to manage cart state
export const CartProvider = ({ children }) => {


  // State for cart open/close
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {

    const newCartCount = cartItems.reduce((total, cartItem) =>total+ cartItem.quantity, 0);
    setCartCount(newCartCount);

  },[cartItems]);

  // Function to add an item to the cart

  const addItemToCart = (productToAdd) => {
    // Call addCartItem function to update cart items
    setCartItems(addCartItem(cartItems, productToAdd, count));
  };


  // The value provided to the context
  const value = {
    isCartOpen,                // Current state: Cart is open or closed
    setIsCartOpen,             // Function to update cart open/close state
    cartItems,                 // Array of items in the cart
    addItemToCart,             // Function to add an item to the cart
    cartCount, // Number of cart items
  };


  

  // Provide the CartContext with the value to its children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
