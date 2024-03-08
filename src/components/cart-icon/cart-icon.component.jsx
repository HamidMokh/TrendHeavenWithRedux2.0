import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { useContext } from 'react';

import './cart-icon.styles.scss'

import { cartContext } from '../../contexts/cart.context';

const CartIcon = ()=>{

    const {isCartOpen, setIsCartOpen } = useContext(cartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
return (
 <div className='cart-icon-container' onClick={toggleIsCartOpen}>
    <ShoppingIcon className='shpping-icon'/>
    <span className='item-count'>0</span>
 </div>
);

}

export default CartIcon;