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

// Import UserContext from the user context file
// UserContext provides a way to access the currentUser value (information of the currently authenticated user) throughout the application.
// This enables components to react dynamically to user authentication status.
import { UserContext } from '../../../contexts/user.contexts';

// Import the styling for the navigation component
// The './navigation.styles.scss' file contains the styles for the Navigation component.
// Styling is separated to keep the component's concerns modular and maintainable.
import './navigation.styles.scss';

import { signOutUser } from '../../../utils/firebase/firebase.utils'

// Define the Navigation functional component
const Navigation = () => {
  // Use the useContext hook to access the currentUser value from UserContext
  // currentUser represents the information of the currently authenticated user.
  // Accessing user information globally is crucial for components that need to adjust their behavior based on authentication status.
  const { currentUser} = useContext(UserContext);
  
  // Log the currentUser value to the console for debugging or information purposes
  // This logging statement is helpful during development to inspect the user data and diagnose any authentication-related issues.
  //console.log(currentUser);

  // Return JSX representing the navigation structure
  return (
    <Fragment>
      {/* Navigation container with logo */}
      {/* The logo is wrapped in a Link component to navigate to the home page when clicked. */}
      {/* Using Link ensures a seamless transition between pages without a full page reload. */}
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          {/* TrendLogo component representing the logo */}
          {/* Importing the logo as a React component allows it to be used like any other JSX element. */}
          <TrendLogo className='logo' />
        </Link>
        
        {/* Container for navigation links */}
        {/* These links provide navigation to different sections or pages of the application. */}
        <div className='nav-links-container'>
          {/* Link to the 'SHOP' page */}
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          
          {/* Link to the 'SIGN IN' page */}
          <Link >
          
          { currentUser?
            (<span className='nav-link' onClick={signOutUser}>SIGNOUT</span>):(
              <Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>
            )
          }

          </Link>
          
        </div>
      </div>
      
      {/* Outlet component to render child components within the navigation structure */}
      {/* Outlet is a placeholder where child components defined in the route hierarchy will be rendered. */}
      {/* It allows for the dynamic rendering of components based on the current route. */}
      <Outlet />
    </Fragment>
  );
};

// Export the Navigation component as the default export of the module
export default Navigation;
