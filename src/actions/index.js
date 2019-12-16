export const ADD_ITEM = 'ADD_ITEM'
export const DECREMENT_QTY = 'DECREMENT_QTY'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_PRICE = 'UPDATE_PRICE'

export const addItem = payload => dispatch => {
  dispatch({
    type: ADD_ITEM,
    payload,
  })

  dispatch(updatePrice())
}

export const removeItem = id => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: id
  })

  dispatch(updatePrice())
}

export const updatePrice = () => {
  return { type: UPDATE_PRICE }
}

export const decrement = payload => dispatch => {
  dispatch({
    type: DECREMENT_QTY,
    payload,
  })
  dispatch(updatePrice())
}
