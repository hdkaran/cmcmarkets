import React, { Component } from "react";

export default class OrderCard extends Component {
  
  render() {
    const order = this.props.order;
    const orderedProds = this.props.order.OrderedProducts;

    return (
      <div className="order-card">
        <h3>
          <b>Your Order </b>
        </h3>
        <div className="m-1">
          <b>Customer Name: </b>
          {order.CustomerName}
        </div>
        <div className="m-1">
          <b>Customer Address: </b>
          {order.CustomerAddress}
        </div>
        <div>
          <div>
            <b>Ordered Products</b>
          </div>
          <div className="p-2">
            {orderedProds &&
              orderedProds.map((product, index) => (
                <div key={index}>
                  <img
                  alt={product.Product.ProductName}
                    className="thumbnail-small"
                    src={
                      process.env.REACT_APP_PHOTOPATH + product.Product.ImageURL
                    }
                  />{" "}
                  {product.Product.ProductName} x {product.Quantity}
                </div>
              ))}
          </div>
        </div>
        <div className="m-1">
          <b>Order Amount: </b>$
          {Math.round((order.OrderTotal - order.ShippingPrice) * 100) / 100}
        </div>
        <div className="m-1">
          <b>Shipping Price: </b>${Math.round(order.ShippingPrice * 100) / 100}
        </div>
        <div className="m-1">
          <b>Order Total: </b>${Math.round(order.OrderTotal * 100) / 100}
        </div>
      </div>
    );
  }
}
