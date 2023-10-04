import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { withRouter } from "react-router-dom";

import TopBar from "./topbar/topbar";
import Navbar from "./navbar/navbar";
import Home from "./bottomSectionHome/home";
import CactusPage from "./pages/cactuspage";
import Blog from "./blog/blogpage";
import Contact from "./pages/contactpage";
import Login from "./login/login";
import UserProfile from "./pages/userprofile";
import BlogEditor from "./blog/blogeditor";
import Invoice from "./pages/invoice";
import CreateAccount from "./login/createaccount";
import AboutUs from "./pages/aboutus";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      currentUser: null,
      cart: [],
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  //Add a product to the shopping cart. Update cart status
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

  //handles user login
  handleLogin(user) {
        this.setState({ isLoggedIn: true, currentUser: user });
  }

  //handles user logout
  handleLogout() {
    this.setState({ isLoggedIn: false, currentUser: null });
    this.props.history.push("/"); // Redirect the user to the home page
  }

  render() {
    const { isLoggedIn, currentUser } = this.state;

    return (
      <Router>
        <div className="app">
          <TopBar
            username={
              isLoggedIn && currentUser ? currentUser.username : undefined
            }
            handleLogout={this.handleLogout} // Pasa la función handleLogout
          />
          <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/cactus"
              render={(props) => (
                <CactusPage
                  isLoggedIn={this.state.isLoggedIn}
                  cart={this.state.cart}
                  {...props} // Aseguro de pasar todas las props
                />
              )}
            />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/aboutus" component={AboutUs} />
            <Route
              path="/shoppingcart"
              render={() => <ShoppingCart cart={this.state.cart} />}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  onLogin={this.handleLogin}
                  updateUser={this.updateUser} // Pasa la función updateUser
                  {...props}
                />
              )}
            />
            <Route
              path="/profile"
              render={() =>
                isLoggedIn ? (
                  <UserProfile
                    id={currentUser ? currentUser.id : null}
                    username={currentUser ? currentUser.username : ""}
                    email={currentUser ? currentUser.email : ""}
                    isLoggedIn={isLoggedIn} // Pasa el estado de autenticación
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/blogeditor"
              render={() => {
                if (
                  isLoggedIn &&
                  currentUser &&
                  currentUser.email === "admin@admin.com"
                ) {
                  return <BlogEditor />;
                } else if (isLoggedIn) {
                  return (
                    <UserProfile
                      username={currentUser.username}
                      email={currentUser.email}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                } else {
                  return <Redirect to="/login" />;
                }
              }}
            />
            <Route
              path="/invoice"
              render={(props) => (
                <Invoice
                  {...props}
                  addToCart={this.addToCart}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route path="/createaccount" component={CreateAccount} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
