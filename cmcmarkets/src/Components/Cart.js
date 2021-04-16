import React, { Component } from "react";
import { Container, Row, Jumbotron } from "react-bootstrap";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Jumbotron fluid className="full-width">
              <Container className="text-center">
                <h1>Your Cart</h1>
              </Container>
            </Jumbotron>
          </Row>
          <Row className="justify-content-center">
            <div>
              {this.props.cart.length === 0 && (
                <div>
                  <h1>
                    Oops! Cart is empty. Please add some items to the cart.
                  </h1>
                </div>
              )}
            </div>
            {this.props.cart.map((item) => (
              <CartItem  key={item.ProductId} onRemove={this.props.onRemoveFromCart} onAdd={this.props.onAddToCart} cartItem={item} />
            ))}
          </Row>
          <Row className="justify-content-center">
            {this.props.cart.length > 0 && <OrderForm cart={this.props.cart}  onCheckoutClicked={this.props.onCheckoutClicked}/>}
          </Row>
        </Container>
      </div>
    );
  }
}
