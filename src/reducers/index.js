  import {
  ADD_ITEM,
  DECREMENT_QTY,
  REMOVE_ITEM,
  UPDATE_PRICE,
} from '../actions'

const initialState = {
  cartItems: [],
  totalPrice: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const isAlreadyAdded = state.cartItems.find(
        product => product.id === action.payload.id
      );
      if (!isAlreadyAdded) action.payload.qty = 1;

      return {
        ...state,
        cartItems: !isAlreadyAdded
          ? [action.payload, ...state.cartItems]
          : state.cartItems.map(
            item =>
              item.id === action.payload.id
                ? { ...item, qty: ++item.qty }
                : item
          )
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case DECREMENT_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map(
          item =>
            item.id === action.payload.id ? { ...item, qty: --item.qty } : item
        )
      };
    case UPDATE_PRICE:
      return {
        ...state,
        totalPrice: state.cartItems
          .reduce((acc, val) => acc + val.qty * val.price, 0)
          .toFixed(2)
      };
    default:
      return state;
  }
}
