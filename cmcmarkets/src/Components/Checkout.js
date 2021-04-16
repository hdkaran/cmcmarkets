import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Row, Jumbotron, Button } from "react-bootstrap";
import OrderCard from "./OrderCard";
class Checkout extends Component {
  state = { order: {} };

  componentDidMount = async () => {
    await fetch(
      process.env.REACT_APP_API + "orders/" + this.props.match.params.id
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          order: data,
        });
      });
  };

  finaliseOrder = async () => {
    const payload = this.state.order;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    await fetch(
      process.env.REACT_APP_API + "orders/" + payload.OrderId,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.props.history.push("/thankyou/" + data.OrderId);
      });

    this.props.setCart([]);
  };

  cancelOrder = () => {
    fetch(process.env.REACT_APP_API + "orders/" + this.props.match.params.id, {
      method: "DELETE",
    });

    this.props.setCart([]);
    this.props.history.push("/");
  };

  render() {
    const order1 = this.state.order;
    return (
      <div>
        <Container fluid>
          <Row>
            <Jumbotron fluid className="full-width">
              <Container className="text-center">
                <h1>Review Order</h1>
              </Container>
            </Jumbotron>
          </Row>
          <Row className="justify-content-center">
            {order1 && <OrderCard order={order1} />}
          </Row>
          <Row className="justify-content-center">
            <Button
              variant="danger mr-2 mt-2"
              onClick={async () => await this.cancelOrder()}
            >
              Cancel Order
            </Button>
            <Button
              variant="success mt-2"
              onClick={async () => await this.finaliseOrder()}
            >
              Place Order
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Checkout);
