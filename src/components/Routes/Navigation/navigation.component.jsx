// Import necessary modules and components from 'react' library
// The Fragment component is used to group multiple JSX elements without introducing an extra DOM node.
import { Fragment, useContext } from 'react';

// Import Outlet and Link components from 'react-router-dom'
// Outlet is a placeholder for child components to be rendered within the parent's context.
// Link is used to create navigation links in the application, facilitating navigation between different pages.
import { Outlet, Link } from 'react-router-dom';

// Import TrendLogo component from the specified SVG file
// TrendLogo is an SVG component representing a trending arrow, used as the logo.
// Importing it as a React component allows seamless integration into the JSX structure.
import { ReactComponent as TrendLogo } from '../../../assets/trend-up-svgrepo-com.svg';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
// Import UserContext from the user context file
// UserContext provides a way to access the currentUser value (information of the currently authenticated user) throughout the application.
// This enables components to react dynamically to user authentication status.
import { UserContext } from '../../../contexts/user.contexts';
import { CartContext } from '../../../contexts/cart.context';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

import { signOutUser } from '../../../utils/firebase/firebase.utils'

// Define the Navigation functional component
const Navigation = () => {
 
  const { currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  return (
    <Fragment>
      {/* Navigation container with logo */}
      {/* The logo is wrapped in a Link component to navigate to the home page when clicked. */}
      {/* Using Link ensures a seamless transition between pages without a full page reload. */}
      <NavigationContainer>
        <LogoContainer to='/'>
          
          <TrendLogo className='logo' />
        </LogoContainer>
        
        
        <NavLinks>
         
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          
         
          <Link >
          
          { currentUser?
            (<NavLink as='span' onClick={signOutUser}>SIGNOUT</NavLink>):( //originally this was a span with class name nav-link which i used to styled a Link component, but styled gave me the ability to use it (the link) as a span using the keyword SPAN.
              <NavLink to='/auth'>
            SIGN IN
          </NavLink>
            )
          }

          </Link>
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        {/* if isCartOpen =1  and Cart dropdown = 1 then show the last item (which is cartdropdown), if iscartopen = 0 then do not show anything this is pure javascrpt */}
      </NavigationContainer>
      
      {/* Outlet component to render child components within the navigation structure */}
      {/* Outlet is a placeholder where child components defined in the route hierarchy will be rendered. */}
      {/* It allows for the dynamic rendering of components based on the current route. */}
      <Outlet />
    </Fragment>
  );
};

// Export the Navigation component as the default export of the module
export default Navigation;