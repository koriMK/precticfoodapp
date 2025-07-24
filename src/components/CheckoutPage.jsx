import { useState, useContext } from 'react'
import { AppContext } from '../AppContext'
import '../styles/CheckoutPage.css'

function CheckoutPage() {
  const { orderTotal, handleCheckout, setCurrentPage, cartItems } = useContext(AppContext)
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleCheckout(address, paymentMethod)
  }
  
  return (
    <div className="checkout-container">
      <button 
        onClick={() => setCurrentPage(cartItems[0]?.restaurantId ? 'restaurant' : 'home')} 
        className="back-btn"
      >
        ← Back
      </button>
      
      <h2 className="section-title">Checkout</h2>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h3>Delivery Address</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apartment/Suite (Optional)</label>
              <input
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Zip Code</label>
              <input
                type="text"
                className="form-control"
                required
              />
            </div>
            
            <h3 className="payment-title">Payment Method</h3>
            <div className="form-group">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span>Credit/Debit Card</span>
              </label>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="card-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            <button type="submit" className="btn place-order-btn">
              Place Order (${orderTotal.toFixed(2)})
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${(orderTotal - 2.99).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>$2.99</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage