import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";

class OrderForm extends Component {
  state = { fullName: "", fullAddress: "" };

  //runs when the big green button is pressed..takes user to the checkout page.
  onCheckout = async (customerDetails) => {
    const items = this.props.cart.map((item) => {
      return { ProductId: item.ProductId, Quantity: item.Quantity };
    });
    //building payload for request
    const payload = {
      CustomerName: customerDetails.fullName,
      CustomerAddress: customerDetails.fullAddress,
      OrderedProducts: items,
    };
    //configuring body and headers
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    //wait for result and push to checkout
    await fetch(process.env.REACT_APP_API + "orders", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.props.history.push("/checkout/" + data.OrderId);
      });
  };
  //form submit handler
  handleSubmit = async (event) => {
    event.preventDefault();
    //data validation
    if (!this.state.fullName) {
      alert("Please enter full name");
      return;
    }
    if (!this.state.fullAddress) {
      alert("Please enter full address");
      return;
    }

    const customerDetails = {
      fullName: this.state.fullName,
      fullAddress: this.state.fullAddress,
    };
     await this.onCheckout(customerDetails);
  };
  //using different changeHandlers, could have used one, but to make life easy...
  handleNameChange = (event) => {
    this.setState({ fullName: event.target.value });
  };

  handleAddressChange = (event) => {
    this.setState({ fullAddress: event.target.value });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Your Full Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.value}
              onChange={this.handleNameChange}
              placeholder="Enter full name..."
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Your Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full address"
              onChange={this.handleAddressChange}
            />
          </Form.Group>

          <Button variant="success big-button" type="submit">
            Checkout
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(OrderForm);
