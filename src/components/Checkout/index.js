import React from 'react'

import CartListView from '../CartListView'

import './index.css'

const Checkout = props => {
  const [isPaymentCOD, setIsPaymentCOD] = React.useState(false)
  const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false)

  const {totalCartAmount, cartCount} = props
  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true)
  }

  const onClickedCOD = () => {
    setIsPaymentCOD(prevState => !prevState)
  }

  return (
    <>
      {isOrderConfirmed ? (
        <div className="order-success-container">
          <h1 className="order-success-info">
            Your order has been placed successfully
          </h1>
        </div>
      ) : (
        <div className="checkout-main-container">
          <CartListView />
          {/* TODO: Add your code for Cart Summary here */}
          <div className="order-summary-container">
            <div className="order-amount-container">
              <h1 className="order-total-heading">Order Total: </h1>
              <h1 className="order-amount-heading">Rs {totalCartAmount} /-</h1>
            </div>
            <p className="order-quantity">{cartCount} Items in cart</p>
            <div className="payment-mode-container">
              <div className="payment-input-container">
                <input
                  type="radio"
                  name="payment_mode"
                  value="card"
                  id="card"
                  disabled
                />
                <label htmlFor="card" className="payment-mode-label">
                  Card
                </label>
              </div>
              <div className="payment-input-container">
                <input
                  type="radio"
                  name="payment_mode"
                  value="NetBanking"
                  id="netBanking"
                  disabled
                />
                <label htmlFor="netBanking">Net Banking</label>
              </div>
              <div className="payment-input-container">
                <input
                  type="radio"
                  name="payment_mode"
                  value="NetBanking"
                  id="netBanking"
                  disabled
                />
                <label htmlFor="netBanking">Net Banking</label>
              </div>
              <div className="payment-input-container">
                <input
                  type="radio"
                  name="payment_mode"
                  value="upi"
                  id="upi"
                  disabled
                />
                <label htmlFor="upi">UPI</label>
              </div>
              <div className="payment-input-container">
                <input
                  type="radio"
                  name="payment_mode"
                  value="wallet"
                  id="wallet"
                  disabled
                />
                <label htmlFor="wallet">Wallet</label>
              </div>
              <div className="payment-input-container">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="payment_mode"
                  value="CashOnDelivery"
                  onClick={onClickedCOD}
                />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
              </div>
            </div>
            <button
              className="button checkout-button"
              type="button"
              onClick={handleConfirmOrder}
              disabled={!isPaymentCOD}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Checkout
