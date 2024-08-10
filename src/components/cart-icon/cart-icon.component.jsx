
import { useContext } from 'react';

import {ShoppingICon, CartIconContainer, ItemCount } from './cart-icon.styles';

import { CartContext } from '../../contexts/cart.context';

const CartIcon = ()=>{

    const {isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
   
return (
 <CartIconContainer onClick={toggleIsCartOpen}>
    <ShoppingICon className='shpping-icon'/>
    <ItemCount>{cartCount}</ItemCount>
 </CartIconContainer>
);

}

export default CartIcon;