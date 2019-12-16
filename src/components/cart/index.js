import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

// Actions
import { addItem, removeItem } from '../../actions'

// Scss
import './cart.scss'

class Cart extends React.Component {
  renderCartItems = () => {
    const {
      cart: {
        cartItems,
        totalPrice,
      },
      removeItem,
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
                {item.qty}x - {item.name} - Price: ${item.price}
                <Button
                  onClick={() => removeItem(item.id)}
                  className="ml-2">
                  Remove Trip
                </Button>
              </ListGroup.Item>
          ))
          }
        </ListGroup>
        <div className="d-flex flex-column my-4">
            <p>
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
    const { addItem } = this.props

    const trip = {
      id: 1,
      name: 'Disney World Trip',
      price: 2000,
    }

    const trip2 = {
      id: 2,
      name: 'Disneyland Trip',
      price: 1000,
    }

    return (
      <>
        <div className="my-3 d-flex text-center flex-column">
          <h1>Welcome to Bret's Store</h1>
          {this.renderCartItems()}
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <Card className="my-5">
            <Card.Body>
              <Card.Title>Trip to Walt Disney World</Card.Title>
              <Card.Text>
                Live the life of fantasy. Go to Disney World
                </Card.Text>
              <Button
                onClick={() => addItem(trip)}
                variant="primary">Add to Cart - $2,000</Button>
            </Card.Body>
          </Card>

          <Card className="my-5">
            <Card.Body>
              <Card.Title>Trip to Disneyland</Card.Title>
              <Card.Text>
                Live the life of fantasy. Go to Disney Land
                </Card.Text>
              <Button
                onClick={() => addItem(trip2)}
                variant="primary">Add to Cart - $1,000</Button>
            </Card.Body>
          </Card>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(
  mapStateToProps,
  { addItem, removeItem }
)(Cart)








