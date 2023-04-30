import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <Link to="/landing" className="logo">CleanBooking</Link>
        <nav className="navigation">
          <ul>
            
            <li><Link to="/second">Mina sidor</Link></li>
          </ul>
        </nav>
      </div>
  )
}

export default Header