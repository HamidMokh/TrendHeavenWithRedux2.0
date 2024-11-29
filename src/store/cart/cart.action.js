import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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
  

export const setIsCartOpen = (boolean) => 

    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


 export   const addItemToCart = (cartItems,productToAdd) => {

        const newCartItems = addCartItem(cartItems, productToAdd);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
      };
    // Function to remove an item from
 export    const removeItemFromCart = (cartItems,cartItemToRemove) =>{
      const newCartItems =removeCartItem(cartItems, cartItemToRemove);
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }
export    const clearItemFromCart = (cartItems,cartItemToClear) =>{
      const newCartItems =clearCartItem(cartItems, cartItemToClear);
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
    }