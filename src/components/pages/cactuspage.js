import React, { Component } from "react";
import { Link } from "react-router-dom";
import data from "./data";

export default class CactusPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [], //Empty shopping cart state
      user: {}, //Empty user state
    };
  }


  //Tries to get a user from local storage and sets it to state if it exists.
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user });
    }
  }


  //Manage the change of quantity of a product in the cart
  handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = this.state.cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    this.setState({
      cart: updatedCart,
    });
  };


  //Handles the click on the "Pay" button.
  handlePayButtonClick = () => {
    const { cart, user } = this.state;

    if (user) {
      this.props.history.push({
        pathname: "/invoice",
        state: { cart, user, total: this.calcularTotal() },
      });
    } else {
      alert("You must login to purchase.");
    }
  };


  //Add an item to cart.
  //Create a new item object with id, name, quantity and price.
  addToCart = (item, quantity) => {
    const newItem = {
      id: item.id,
      name: item.name,
      quantity: quantity,
      price: item.price,
    };

    this.setState((prevState) => ({
      cart: [...prevState.cart, newItem],
    }));
  };


  //Maps over the cart items and returns a component for each one.
  renderCartItems = () => {
    const cartItems = this.state.cart.map((item) => (
      <div className="cart-item" key={item.id}>
        <div>{item.name}</div>
        <div className="price-container">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => this.handleQuantityChange(item.id, e.target.value)}
          />
          <p>{item.price}</p>
          <p>{(parseFloat(item.price) * item.quantity).toFixed(2)}€</p>{" "}
          
        </div>
      </div>
    ));

    return cartItems.length > 0 ? <div>{cartItems}</div> : null; 
  };

  //Calculate the cart total.
  //Use reduce to add the price of each product multiplied by its quantity.
  calcularTotal = () => {
    const total = this.state.cart.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price),
      0
    );
    return total.toFixed(2) + "€"; // Modificado para añadir '€'
  };



  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="cactus-shop-container">

        <div className="left-shop">
          {data.map((item) => (
            <div key={item.id} className="shop-products">
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => this.addToCart(item, 1)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="right-shop">
          <div className="shopping-cart-header">
            <h2>Shopping Cart</h2>
          </div>

          {!isLoggedIn && (
            <div className="login-to-buy-wrapper">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button className="login-to-buy-button">Login to Buy</button>
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div>
              <div className="cart-header">
                <p>Item</p>
                <p>Units</p>
                <p>Price</p>
                <p>Total</p>
              </div>

              <div className="cart-items">{this.renderCartItems()}</div>

              <div className="total">
                <p>Total to Pay:</p>
                <p>
                  <strong>{this.calcularTotal()}</strong>
                </p>
              </div>

              <button
                className="pay-button"
                onClick={this.handlePayButtonClick}
              >
                Pay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
