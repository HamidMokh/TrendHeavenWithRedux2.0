import { useSelector } from 'react-redux';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'
import { selectCartItems } from '../../store/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ()=> {
const cartItems = useSelector(selectCartItems);
const navigate = useNavigate();
const goToCheckoutHandler = ()=> navigate('/checkout');
    return(
<CartDropdownContainer>
    <CartItems >
        {
            cartItems.length ? (cartItems.map(item => (
                <CartItem key={item.id} cartItem={item}/>))) : (
                <EmptyMessage> Your Cart is empty</EmptyMessage>    
                )
        }
        
    </CartItems>
    <Button onClick={goToCheckoutHandler} > Go to CHECKOUT</Button>
</CartDropdownContainer>

    );


}


export default CartDropdown;