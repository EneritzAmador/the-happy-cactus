import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import the logout icon

library.add(faSignOutAlt); // Import the logout icon

export default class TopBar extends Component { 
  constructor() {
    super();
    this.logocactus = "https://images2.imgbox.com/82/6a/LkyvogaK_o.jpg";

  } 

  render() {
    const { username, handleLogout } = this.props; // I destruct the properties (props) that are passed to the component. I extract username and handleLogout from the properties.

    return (
      <div className="topbar">
        <div className="left">
          <div className="bar-image">
            <img src={this.logocactus} alt="cactus logo" />
          </div>
          <h2>The Happy Cactus</h2>
        </div>

        <div className="right">
          {username ? (
            <div className="username">{username}</div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}

          {username && (
            <div className="shop-icon" alt="logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          )}
        </div>
      </div>
    );
  }
}