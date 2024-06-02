
import { createContext, useState, useEffect } from "react";


// Function to add an item to the cart
// we have 2 cases either the item exists in the cart or not, if it exists then increment the quantity if not set the quantity to one.
export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, cartItemToRemove) => {
 //look for the product that you want to remove inside of the CartItems.
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if it is remove that item (product) entirely from the cart (this will return a new object meaning react will re-render, and the item will desapear)
    if(existingCartItem.quantity === 1) {
     return  cartItems.filter((cartItem)=>cartItem.id !== cartItemToRemove.id)
    }

    return cartItems.map( (cartItem)=>
      cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity -1}
      : cartItem
    )
  }

 export const clearCartItem = (cartItems, cartItemToClear)=>{
    return  cartItems.filter((cartItem)=>cartItem.id !== cartItemToClear.id)
 }


// Create the CartContext with initial values

export const CartContext = createContext({
  isCartOpen: false,           // Initial state: Cart is closed
  setIsCartOpen: () => {},     // Function to set cart state
  cartItems: [],               // Initial state: Cart is empty
  addItemToCart: () => {},     // Function to add item to cart
  removeItemToCart:()=> {}, // Function to remove item from cart
  clearItemFromCart:()=> {}, // Function to clear item from cart
  cartCount :0,
  cartTotal: 0
  });


// CartProvider component to manage cart state
export const CartProvider = ({ children }) => {

  // State for cart open/close
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  const [cartCount, setCartCount] = useState(0);

  const [cartTotal, setCartTotal]= useState(0);

  useEffect(() => {

    const newCartCount = cartItems.reduce((total, cartItem) =>total+ cartItem.quantity, 0);
    setCartCount(newCartCount);

  },[cartItems]);

  useEffect(() => {

    const newCartTotal = cartItems.reduce((total, cartItem) =>total + cartItem.price * cartItem.quantity, 0);
    setCartTotal(newCartTotal);

  },[cartItems]);

  // Function to add an item to the cart

const addItemToCart = (productToAdd) => {
    // Call addCartItem function to update cart items
    setCartItems(addCartItem(cartItems, productToAdd));
  };

// Function to remove an item from
const removeItemToCart = (cartItemToRemove) =>{
  setCartItems(removeCartItem(cartItems, cartItemToRemove));
}

const clearItemFromCart = (cartItemToClear) =>{
  setCartItems(clearCartItem(cartItems, cartItemToClear));
}

 //or i can name the argument productToRemove to oppose productToAdd.
  // const removeItemFromCart = (productToRemove) =>{
  //   setCartItems(removeCartItem(cartItems, productToRemove, count));
  // }

  // The value provided to the context
const value = {
    isCartOpen,                // Current state: Cart is open or closed
    setIsCartOpen,             // Function to update cart open/close state
    cartItems,                 // Array of items in the cart
    addItemToCart,             // Function to add an item to the cart
    removeItemToCart, // Function to remove an item from the cart and
    cartTotal, // Function to calculate the total cart items price.
    clearItemFromCart, // Function to clear items from the cart
    cartCount, // Number of cart items
  };

  // Provide the CartContext with the value to its children
return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
