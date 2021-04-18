import React, { Component } from "react";
import { Container, Row, Jumbotron } from "react-bootstrap";
import Product from "./Product";


export default class Home extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProductList();
  }

  getProductList() {

    fetch(process.env.REACT_APP_API + "products")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          products: data,
        });
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Jumbotron fluid className="full-width">
              <Container className="text-center">
                <h1>Our Cricket Collection</h1>
                <p>
                  CMC Market cricket collection is one of the finest the
                  sporting world has to offer. Check out our range below.
                </p>
              </Container>
            </Jumbotron>
          </Row>
          <Row className="justify-content-center">
             {Object.keys(this.state.products).length!=0?this.state.products.map((product, index) => (
              <Product
                key={index}
                prod={product}
                addToCart={this.props.onAddToCart}
              ></Product>
            )):<h5>No Data Available. Please check if you have configured the server settings correctly.</h5>}
          </Row>
        </Container>
      </div>
    );
  }
}
