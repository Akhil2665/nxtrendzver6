import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickOnRemoveAll = () => removeAllCartItems()
      const cartCount = cartList.length
      const showEmptyView = cartCount === 0
      const cartValueList = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const totalCartAmount = cartValueList.reduce((acc, curr) => acc + curr, 0)
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-button"
                  type="button"
                  onClick={onClickOnRemoveAll}
                >
                  Remove All
                </button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="order-summary-container">
                  <div className="order-amount-container">
                    <h1 className="order-total-heading">Order Total: </h1>
                    <h1 className="order-amount-heading">
                      Rs {totalCartAmount} /-
                    </h1>
                  </div>
                  <p className="order-quantity">{cartCount} Items in cart</p>
                  <button className="button checkout-button" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
