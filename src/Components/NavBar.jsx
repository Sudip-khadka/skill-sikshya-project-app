import React from 'react'
import '../Styles/Navbar.css'
import Logo from '../assets/logo.png'



export default function NavBar() {

   let admin = document.getElementById('admin-name');


  return (
    <nav>
    <div className='navbar'>
        <div className="profile">
            <div className="profile-image">

            <h1>P</h1>
            </div>
            <h3 id='admin-name'>Prabodh</h3>
        </div>
    </div>
    </nav>
  )
}
