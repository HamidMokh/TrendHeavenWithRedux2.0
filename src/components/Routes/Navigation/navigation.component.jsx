
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as TrendLogo } from '../../../assets/trend-up-svgrepo-com.svg';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser} from '../../../store/user/user.selector';
import { selectIsCartOpen } from '../../../store/cart/cart.selector';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';
import { signOutUser } from '../../../utils/firebase/firebase.utils'
// Define the Navigation functional component
const Navigation = () => {

const currentUser = useSelector(selectCurrentUser);
const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <TrendLogo className='logo' />
        </LogoContainer>
            <NavLinks>
              <NavLink to='/shop'>
                SHOP
              </NavLink>
                <Link>
                    {
                      currentUser ? (
                      <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                      ) : (
                      <NavLink to='/auth'>SIGN IN</NavLink>
                      )
                    }
                </Link>
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        {/* if isCartOpen =1  and Cart dropdown = 1 then show the last item (which is cartdropdown), if iscartopen = 0 then do not show anything this is pure javascrpt */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

// Export the Navigation component as the default export of the module
export default Navigation;