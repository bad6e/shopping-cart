  import {
  ADD_ITEM,
  DECREMENT_QTY,
  INCREMENT_QTY,
  REMOVE_ITEM,
  SET_CART,
  UPDATE_PRICE,
} from '../actions'

const initialState = {
  cartItems: [],
  totalPrice: 0
}

const totalValue = (acc, val) => acc + val.quantity * val.price

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
    return { cartItems: action.payload }
    case ADD_ITEM:
      const itemInCart = state.cartItems.find(item => item.id === action.payload.id)
      const itemToBeAdded = action.payload

      if (itemInCart) {
        itemInCart.quantity += 1
        return { cartItems: [...state.cartItems] }
      } else {
        itemToBeAdded.quantity = 1

        return { cartItems: [itemToBeAdded, ...state.cartItems] }
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      }
    case DECREMENT_QTY:
      const decrementedCartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id ? { ...item, quantity: --item.quantity } : item
      })

      return {
        ...state,
        cartItems: decrementedCartItems,
      }
    case INCREMENT_QTY:
      const incrementedCartItems = state.cartItems.map((item) => {
        return item.id === action.payload.id ? { ...item, quantity: ++item.quantity } : item
      })

      return {
        ...state,
        cartItems: incrementedCartItems
      }
    case UPDATE_PRICE:
      return {
        ...state,
        totalPrice: state.cartItems.reduce(totalValue, 0)
      }
    default:
      return state
  }
}
