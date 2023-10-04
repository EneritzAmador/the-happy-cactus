import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

export default class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  //update component state when a change is made to input fields
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }


  //Collect the email and password of the state and make a GET request to an AP
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .get(`https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/custom_login_get`)
      .then((response) => {
        const users = response.data;
        const user = users.find((user) => user.email === email && user.password === password);
  
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.props.onLogin(user);
          if (user.email === "admin@admin.com") {
            this.props.history.push("/blogeditor");
          } else {
            this.props.history.push("/profile");
          }
        } else {
          alert("Incorrect username or password. Try again or create an account."); 
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while trying to log in"); 
      });
  }
  


  render() {
    const { email, password, error } = this.state;

    return (
      <div className="login-container"> 

        <h1>Login</h1>

        <div className="login-card">

          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="login-input">
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="login-input">
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>

          <p>
            <Link to="/createaccount"><strong>Create a new account here</strong></Link>
          </p>

        </div>
      </div>
    );
  }
}
