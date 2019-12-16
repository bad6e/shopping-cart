import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { isEmpty } from 'lodash'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

// Actions
import {
  addItem,
  decrementByOne,
  incrementByOne,
  removeItem,
  setCart,
 } from '../../actions'

 // Utils
import { fetchItemsFromLocalStorage, ITEM_KEY } from '../../localStorageHelper'

// Scss
import './cart.scss'

class Cart extends React.Component {
  state = {
    trips: [],
  }

  componentDidMount() {
    const { setCart } = this.props
    const savedCartItems = fetchItemsFromLocalStorage(ITEM_KEY)
    console.log(savedCartItems)
    !isEmpty(savedCartItems) && setCart(savedCartItems)
  }

  componentDidUpdate(prevProps) {
    const { trips: prevTrips } = prevProps
    const { trips } = this.props

    if (prevTrips !== trips) {
      this.setState({ trips })
    }
  }

  decrementItem = item => {
    const { decrementByOne, removeItem } = this.props
    return item.quantity > 1 ? decrementByOne(item) : removeItem(item)
  }

  renderTrips = () => {
    const { trips } = this.state
    const { addItem } = this.props

    if (isEmpty(trips)) return (
      <Spinner />
    )

    return (
      <>
        {
          trips.map((trip) => {
            return (
              <Card className="my-5" key={trip.id}>
                <Card.Body>
                  <Card.Title>{trip.title}</Card.Title>
                  <Card.Text>
                    {trip.description}
                  </Card.Text>
                  <Button
                    onClick={() => addItem(trip)}
                    variant="primary">Add to Cart - ${trip.price}</Button>
                </Card.Body>
              </Card>
            )
          })
        }
      </>
    )
  }

  renderCartItems = () => {
    const {
      cart: {
        cartItems,
        totalPrice,
      },
      removeItem,
      incrementByOne,
    } = this.props


    if (isEmpty(cartItems)) return (
      <h5>Your cart is empty!</h5>
    )

    return (
      <div>
        <ListGroup>
          {
            cartItems.map(item => (
              <ListGroup.Item className="d-flex flex-row" key={item.id}>
                {item.quantity}x - {item.title} - Price: ${item.price}
                <Button
                  onClick={() => removeItem(item)}
                  className="ml-2">
                  Remove Trip
                </Button>
                <Button
                  onClick={() => incrementByOne(item)}
                  className="ml-2">
                  + 1
                </Button>
                <Button
                  onClick={() => this.decrementItem(item)}
                  className="ml-2">
                  - 1
                </Button>
              </ListGroup.Item>
          ))
          }
        </ListGroup>
        <div className="d-flex flex-column my-4">
            <p className="text-right mr-2">
              <b>
                Total Price:
                $
                {totalPrice}
              </b>
            </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="my-3 d-flex text-center flex-column">
          <h1>Welcome to Bret's Store</h1>
          {this.renderCartItems()}
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <CardGroup>
            {this.renderTrips()}
          </CardGroup>
        </div>
      </>
    )
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'trips'},
  ]),
  connect((state) => ({
    trips: state.firestore.ordered.trips,
    cart: state.cart,
    firestore: state.firestore,
  }),
  {
    addItem,
    decrementByOne,
    incrementByOne,
    removeItem,
    setCart,
  })
)(Cart)
