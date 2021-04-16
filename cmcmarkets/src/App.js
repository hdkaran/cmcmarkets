import "./App.css";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import Cart from "./Components/Cart";
import ThankYou from "./Components/ThankYou";
import { useState } from "react";
import { BrowserRouter,  Route, Switch } from "react-router-dom";
import Checkout from "./Components/Checkout";

function App(props) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find((x) => x.ProductId === product.ProductId);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.ProductId === product.ProductId
            ? { ...exist, Quantity: exist.Quantity + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...product, Quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find((x) => x.ProductId === product.ProductId);
    if (exist) {
      if (exist.Quantity === 1)
        setCart(cart.filter((item) => item.ProductId !== exist.ProductId));
      else
        setCart(
          cart.map((x) =>
            x.ProductId === product.ProductId
              ? { ...exist, Quantity: exist.Quantity - 1 }
              : x
          )
        );
    }
  };

  const getTotalItems = (cart) => {
    var total = 0;
    cart.forEach((item) => {
      total = total + item.Quantity;
    
    });

    return total;
  };


  return (
    <BrowserRouter>
      <Navigation cartLength={getTotalItems(cart)} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Home onAddToCart={addToCart} />}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              cart={cart}
            />
          )}
        />
        <Route
          path="/checkout/:id"
          render={(props) => <Checkout setCart={setCart} />}
        />
        <Route path="/thankyou/:id" render={(props) => <ThankYou />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
