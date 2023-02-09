import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Header = () => {
  return (
    <nav className='header'>
      <div>
        <h1 className='header__title'>Web Admin</h1>
      </div>
      <button className='button button--new'>
        <Link to={'/products/new'}>Add User</Link>
      </button>
    </nav>
  )
}

export default Header