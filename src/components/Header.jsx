import { useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/Header.css'
import { FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

function Header() {
  const { user, cartItems, setShowCart, setShowLoginModal } = useContext(AppContext)
  
  return (
    <header>
      <div className="header-container container">
        <div className="logo">
          <span className="logo-icon">
            <FaShoppingCart />
          </span>
          <span>Food For</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Restaurants</a></li>
          <li><a href="#">Offers</a></li>
          <li><a href="#">Help</a></li>
        </ul>
        
        <div className="auth-buttons">
          {user ? (
            <span className="user-greeting">
              <FaUser style={{ marginRight: '5px' }} />
              Welcome, {user.name}
            </span>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                <FaSignInAlt style={{ marginRight: '5px' }} />
                Log In
              </button>
              <button className="signup-btn" onClick={() => setShowLoginModal(true)}>
                <FaUserPlus style={{ marginRight: '5px' }} />
                Sign Up
              </button>
            </>
          )}
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header