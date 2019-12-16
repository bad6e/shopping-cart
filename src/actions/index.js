export const ADD_ITEM = 'ADD_ITEM'
export const DECREMENT_QTY = 'DECREMENT_QTY'
export const INCREMENT_QTY = 'INCREMENT_QTY'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SET_CART = 'SET_CART'
export const UPDATE_PRICE = 'UPDATE_PRICE'

export const setCart = payload => dispatch => {
  dispatch({
    type: SET_CART,
    payload,
  })

  dispatch(updatePrice())
}

export const addItem = payload => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload,
  })

  dispatch(updatePrice())
}

export const removeItem = payload => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload,
  })

  dispatch(updatePrice())
}

export const updatePrice = () => {
  return { type: UPDATE_PRICE }
}

export const decrementByOne = payload => dispatch => {
  dispatch({
    type: DECREMENT_QTY,
    payload,
  })

  dispatch(updatePrice())
}

export const incrementByOne = payload => dispatch => {
  dispatch({
    type: INCREMENT_QTY,
    payload,
  })

  dispatch(updatePrice())
}
