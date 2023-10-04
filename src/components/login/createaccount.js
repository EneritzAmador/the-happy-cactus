import React, { Component } from "react";
import axios from "axios";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //When an input changes, this method updates the corresponding state with the new value.
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //runs when the form is submitted.
  //Make a POST request to my API to create a user profile
  handleSubmit(e) {
    e.preventDefault();
    const { username, email, password } = this.state;

    axios
      .post(`https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/create`, {
        username,
        email,
        password,
      })
      .then(
        function (response) {
          console.log(response.data);
          alert("Profile created successfully. Login with your new account");
          this.props.history.push("/login");
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error:", error);
      });
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <div className="create-account-container">
        <div className="create-account-form-title">
          <h1>Create Account</h1>
        </div>

        <div className="create-account-box">
          <form onSubmit={this.handleSubmit}>
            <div className="create-account-input">
              <label htmlFor="username">Your Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="create-account-input">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="create-account-input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="create-account-button">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
