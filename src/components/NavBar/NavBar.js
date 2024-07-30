import React, {useState} from 'react'
import '../NavBar/NavBar.css'
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

//after testing: change all href of <a> tag to "to" element of Link tag
function NavBar() {
  return (
    <div className='nav-containter'>
        <nav className='navbar'>
          {/* <Link href='/' className='site-title'> */}
          <Link to="/" className='site-title'>
            Algorithms Visualizer
          </Link>
          <ul>
            <CustomLink to={"/Category"}>Category</CustomLink>
            <CustomLink to={"/About"}>About</CustomLink>
          </ul>
        </nav>
    </div>
  )
}

function CustomLink({to,children,...props}) {
  // const path = window.location.pathname;
  // remote path and using function of react-router-dom below instead
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname})
  return(
    // <li className={path === to ? "active" : ""}>
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  )
}

export default NavBar