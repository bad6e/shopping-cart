import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import thunk from 'redux-thunk'

import { firebaseConfig } from './config/firebase'
import cartReducer from './reducers'

const rfConfig = {} // optional redux-firestore Config Options

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
firebase.firestore()

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase, rfConfig),
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({})),
  ))(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
  cart: cartReducer,
})

// Create store with reducers and initial state
const initialState = {}

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
)

export default store