import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom"; 


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newUsername: "",
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }


  //Runs after the component is mounted
  componentDidMount() {
    console.log("UserProfile montado");
  }


  //Change the user's password. Extracts the newPassword from the local state and the user id from the props.
  //Use Axios to make a PUT request to my API
  handlePasswordChange() {
    const { newPassword } = this.state;
    const { id } = this.props;
    const url = `https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/editpw/${id}`;

    console.log("Request URL:", url);
    axios
      .put(
        `https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/editpw/${id}`,
        {
          password: newPassword,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Password changed successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }


  //Change the username (like handlePasswordChange() but with Username)
  handleUsernameChange() {
    const { newUsername } = this.state;
    const { id } = this.props;
    axios
      .put(
        `https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/update/${id}`,
        {
          username: newUsername,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Username changed successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // Delete the user account.
  // Gets the user id from the props and uses Axios to make a DELETE request.
  handleDeleteAccount() {
    const { id } = this.props;
    axios
      .delete(
        `https://cactus-api-login-4453c01c9d7e.herokuapp.com/user/delete/${id}`
      )
      .then((response) => {
        console.log(response.data);
        alert("Successfully deleted account");
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    const { username, email } = this.props;

    return (
      <div className="user-profile">
        <h1>Hello {username}! Welcome to your profile</h1>

        <div className="user-info">
          <div>
            <strong>Username:</strong> {username}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
        </div>

        <div className="input-container">
          <input
            className="input-password"
            type="text"
            placeholder="New Password"
            value={this.state.newPassword}
            onChange={(e) => this.setState({ newPassword: e.target.value })}
          />
          <button onClick={this.handlePasswordChange}>Change Password</button>
        </div>

        <div className="input-container">
          <input
            className="input-username"
            type="text"
            placeholder="New Username"
            value={this.state.newUsername}
            onChange={(e) => this.setState({ newUsername: e.target.value })}
          />
          <button onClick={this.handleUsernameChange}>Change Username</button>
        </div>

        <button className="delete-button" onClick={this.handleDeleteAccount}>
          Delete Account
        </button>
        
        <p>
          <i>When you delete your account, the data cannot be recovered</i>
        </p>
      </div>
    );
  }
}

export default withRouter(UserProfile);
