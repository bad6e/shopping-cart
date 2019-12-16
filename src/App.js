import React from 'react'
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, } from 'react-redux-firebase'
import firebase from 'firebase/app'
import Navbar from 'react-bootstrap/Navbar'

// Store
import store from './store'

// Components
import Cart from './components/cart'

// Base Scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Bret's Cart</Navbar.Brand>
          </Navbar>
          <Cart />
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
}

export default App
