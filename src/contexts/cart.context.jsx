
import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
// Create the CartContext with initial values
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () =>{},
  cartItems: [],               // Initial state: Cart is empty
  addItemToCart: () => {},     // Function to add item to cart
  removeItemToCart:()=> {}, // Function to remove item from cart
  clearItemFromCart:()=> {}, // Function to clear item from cart
  cartCount :0,
  cartTotal: 0
  });

  
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
  return updatedCartItems;}
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

//1. to convert from context to reducer i started by extrapolating the below readable values not functions to )

const INITIAL_STATE = {
  isCartOpen: false, 
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const CartReducer = (state, action)=>{
//2. do not forget that action and state are object that came with the reducer, as part of the set up, the next line of code is destructuring 2 propreties that came by default in the "action", which are "type" and "payload". 
  const {type, payload} = action;
//3. now we need to determine with these 2 properties from the action what do we need to do return in case INITIAL_STATE is changed (updated).
//4. we know we need a reducer, but it gets to be confusing, this is the breadkdown that i choosed to use, i first set up the reducer by declaring a switch statement.
//5. first thing to do is handle the error if unhandled type occured (meanning we did not write code for this type or the type doens't match exist)
//6. As part of the best practises, never write business logic inside of your reducer, it can be done but we need to write a ton of business logic in order to make it work.
//7. the reducer should care about updating the state, nothing else.
//8. the reducer should receive some payload and update the state, to do that we have to dispatch an action that have all of the values that our reducer needs
//9. in my case i'm converting from context to reducer,so i will inspire from my hook based flow.
//10.in my hook based flow i'm using use effect to update cart items, cartCount, CartTotal
//11.in this reduceri used on Action to update all of these in one payload.
switch (type) {
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      ...payload,
    }
  case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    return {
      ...state,
      isCartOpen: payload,
    }
  default:
    throw new Error(`unhandeled type of ${type} in cartReducer`)

}

}

// CartProvider component to manage cart state
export const CartProvider = ({ children }) => {
  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) =>total+ cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) =>total + cartItem.price * cartItem.quantity, 0);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
         cartItems: newCartItems,
         cartTotal: newCartTotal, 
         cartCount: newCartCount,
        }));
  };

const setIsCartOpen = (bool)=>{
  dispatch(
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,
      bool
    ))
};

const addItemToCart = (productToAdd) => {
    // Call addCartItem function to update cart items
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
// Function to remove an item from
const removeItemToCart = (cartItemToRemove) =>{
  const newCartItems =removeCartItem(cartItems, cartItemToRemove);
  updateCartItemsReducer(newCartItems);
}
const clearItemFromCart = (cartItemToClear) =>{
  const newCartItems =clearCartItem(cartItems, cartItemToClear);
  updateCartItemsReducer(newCartItems);
}

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
