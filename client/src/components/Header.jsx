import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between px-20 py-10'>
      <h1 className='text-2xl font-bold'>Brand</h1>

      <nav>
        <ul className='flex gap-12'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/register">Register</Link></li> */}
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>

      <button className='bg-yellow-500  text-white font-semibold px-5 py-2 rounded-2xl hover:underline hover:bg-yellow-600'>
        Enquire
      </button>
    </div>
  )
}

export default Header