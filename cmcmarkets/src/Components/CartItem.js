import React, { Component } from "react";
import { Row, Button, Col } from "react-bootstrap";

export default class CartItem extends Component {

  
  render() {
    const item = this.props.cartItem;
    return (
      <Row key={item.id} className="text-center m-2">
        <Col lg={12} className="justify-content-center">
          <img
          alt={item.ProductName}
            className="checkout-image"
            src={process.env.REACT_APP_PHOTOPATH + item.ImageURL}
          />
        </Col>
        <Col lg={12} className="justify-content-center">
          <h3>{item.ProductName}</h3>
        </Col>
        <Col lg={12} className="justify-content-center">
          <h6>Qty: {item.Quantity}</h6>
        </Col>
        <Col lg={12} className="justify-content-center">
          <Button
            className="bg-danger m-2"
            onClick={() => {
              this.props.onRemove(item);
            }}
          >
            -
          </Button>
          <Button
            className="bg-success m-2"
            onClick={() => {
              this.props.onAdd(item);
            }}
          >
            +
          </Button>
        </Col>
      </Row>
    );
  }
}
