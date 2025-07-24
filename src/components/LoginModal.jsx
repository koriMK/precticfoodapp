import { useState, useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/LoginModal.css'
import { FaTimes } from 'react-icons/fa'

function LoginModal() {
  const { setShowLoginModal, handleLogin } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(email, password)
  }
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={() => setShowLoginModal(false)}>
          <FaTimes />
        </button>
        <div className="modal-header">
          <h3 className="modal-title">{isSignUp ? 'Sign Up' : 'Log In'}</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                />
              </div>
            )}
            <button type="submit" className="btn btn-block">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          <p className="auth-toggle">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="auth-toggle-btn"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal