import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
export default class Product extends Component {
  render() {
    var product=this.props.prod;
    
    return <Col lg={3} md={6} xs={12} className="text-center m-2">
        <img alt={product.ProductName} src={process.env.REACT_APP_PHOTOPATH+product.ImageURL} />
        <h3>{product.ProductName}</h3>
        <h5>${product.Price}</h5>
        <p>{product.ProductDescription}</p>
        <Button variant="primary" onClick={()=>this.props.addToCart(product)}>Add To Cart</Button>
    </Col>;
  }
}
