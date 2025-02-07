import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList = []} = value // Default to empty array if cartList is undefined
      const cartLength = Array.isArray(cartList) ? cartList.length : 0

      return cartLength > 0 ? (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
          ))}
        </ul>
      ) : (
        <EmptyCartView />
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
