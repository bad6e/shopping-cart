import React from 'react'
import { Provider } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'

// Store
import store from './store'

// Components
import Cart from './components/cart'

// Scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Bret's Cart</Navbar.Brand>
        </Navbar>
        <Cart />
      </Provider>
    )
  }
}

export default App
