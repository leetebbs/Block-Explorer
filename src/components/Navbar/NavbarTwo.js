import React from 'react'
import './NavbarTwo.css'
import Logo from '../../Assets/tebboscan.png'

const NavbarTwo = () => {
  return (
    <div className='navbarTwo_main'>
      <div className="navbarTwo_container">
      <img className='logo' src={Logo} alt=""/>
      <ul>
        <li>Home</li>
        <li>Blockchain</li>
        <li>Tokens</li>
        <li>NFTs</li>
        <li>Resources</li>
        <li>Developers</li>
        <li>More</li>
      </ul>
      </div>
    </div>
  )
}

export default NavbarTwo