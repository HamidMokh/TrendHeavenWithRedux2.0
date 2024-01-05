
import { Fragment } from 'react'
// When rendering multiple JSX elements in React, they must be enclosed in a single parent element.
// The <Fragment> component is a lightweight way to achieve this without adding an extra DOM node.
// It's especially useful when you want to group elements without impacting the page structure.
// In this example, the <Fragment> allows us to return adjacent JSX elements without a wrapping div.

import { Outlet, Link } from 'react-router-dom';
import {ReactComponent as TrendLogo} from '../../../assets/trend-up-svgrepo-com.svg'
import './navigation.styles.scss'

const Navigation = ()=> {
    return(
      <Fragment>
      <div className='navigation'>
     <Link className='logo-container' to='/' > 
      <TrendLogo className='logo' />
      </Link>
     <div className='nav-links-container'>
     <Link className='nav-link' to='/shop'>
        SHOP
     </Link>
     <Link className='nav-link' to='/sign-in'>
        SIGN IN
     </Link>
      </div> 
      </div>
      <Outlet />
      </Fragment>
    )
  };

  export default Navigation;