import { useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/Footer.css'

function Footer() {
  const { setCurrentPage } = useContext(AppContext)

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Food For</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>For Restaurants</h3>
            <ul>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Business App</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Download App</h3>
            <ul>
              <li><a href="#">iOS</a></li>
              <li><a href="#">Android</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Food For. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer