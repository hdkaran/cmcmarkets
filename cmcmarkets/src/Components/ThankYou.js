import React, { Component } from "react";
import {Container, Row, Jumbotron} from "react-bootstrap"
export default class ThankYou extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Jumbotron fluid className="full-width">
              <Container className="text-center">
                <h1>Thank you for placing your order. Your order will be shipped soon.</h1>
              </Container>
            </Jumbotron>
          </Row>
        </Container>
      </div>
    );
  }
}
