import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {
  firebaseReducer,
  getFirebase,
 } from 'react-redux-firebase'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

import cartReducer from './reducers'
import {
  removeItemsFromLocalStorage,
  ITEM_KEY,
  setItemsInLocalStorage,
} from './localStorageHelper'

import {
  ADD_ITEM,
  DECREMENT_QTY,
  INCREMENT_QTY,
  REMOVE_ITEM,
} from './actions'

const firebaseConfig = {
  // apiKey: "AIzaSyCPd_v6lP8xkVX_HmJFxJ-p1eDlpmwb-04",
  projectId: "shopping-cart-2",
}

const WHITE_LISTED_ACTIONS = [
  ADD_ITEM,
  DECREMENT_QTY,
  INCREMENT_QTY,
  REMOVE_ITEM,
]

const saveToLocalStorage = () => store => next => action => {
  if (WHITE_LISTED_ACTIONS.includes(action.type)) {
    removeItemsFromLocalStorage(ITEM_KEY)
    next(action)
    const updatedCartItems = store.getState().cart.cartItems
    setItemsInLocalStorage(ITEM_KEY, updatedCartItems)
  } else {
    next(action)
  }
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
firebase.functions() // <- needed if using httpsCallable

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase, rrfConfig), // firebase instance as first argument, rfConfig as optional second
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

// Create store with reducers and initial state
const initialState = {}

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      saveToLocalStorage(),
      thunk.withExtraArgument(getFirebase)),
  ),
)

export default store
