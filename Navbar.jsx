import React from 'react'
import './Navbar.css'

import { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  
    const [menu,setMenu] = useState("shop");

  return (
    
    <div className='navbar'>
        <ul className='nav-menu'> 
        <li onClick={()=>{setMenu("Home")}}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link> {menu ==="Home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Work")}}><Link style={{ textDecoration: 'none' }} to='/Work'>Work</Link> {menu ==="Work"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Personal")}}><Link style={{ textDecoration: 'none' }} to='/Personal'>Personal</Link> {menu ==="Personal"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("TTT")}}><Link style={{ textDecoration: 'none' }} to='/Timetable'>TimeTable</Link>{menu ==="TTT"?<hr/>:<></>}</li>
        </ul>
    </div>
    
  )
}

export default Navbar
