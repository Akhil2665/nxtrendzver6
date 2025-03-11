import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const updateQuantityCartList = cartList.map(eachItem =>
      eachItem.id === product.id
        ? {...eachItem, quantity: eachItem.quantity + product.quantity}
        : eachItem,
    )
    const existingProduct = cartList.find(
      eachItem => eachItem.id === product.id,
    )
    if (existingProduct) {
      this.setState({cartList: updateQuantityCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    // const newCartList = updateQuantityCartList.filter(
    //   eachItem => eachItem.id === product.id,
    // )
    // if (newCartList.length !== 0) {
    //   this.setState({cartList: updateQuantityCartList})
    // } else {
    //   this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    // }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    // const updatedList = cartList.map(eachItem =>
    //   eachItem.id === id && eachItem.quantity > 0
    //     ? {...eachItem, quantity: eachItem.quantity - 1}
    //     : eachItem,
    // )
    const updatedList = cartList.map(eachItem =>
      eachItem.id === id && eachItem.quantity >= 1
        ? {...eachItem, quantity: eachItem.quantity - 1}
        : eachItem,
    )
    const filterdList = updatedList.filter(eachItem => eachItem.quantity !== 0)
    this.setState({cartList: filterdList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedList = cartList.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )

    this.setState({cartList: updatedList})
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
