import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 


//The navigation bar
export default class Navbar extends Component {
    render() {
        const { isLoggedIn, currentUser } = this.props;
        
        return (
            <div className='nav-container'>

                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <NavLink to="/cactus" className="nav-link">Cactus Shop</NavLink>
                <NavLink to="/blog" className="nav-link">Blog</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                <NavLink to="/aboutus" className="nav-link">About Us</NavLink>
                {isLoggedIn && (
                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                )}
                {isLoggedIn && currentUser && currentUser.email === "admin@admin.com" && (
                    <NavLink to="/blogeditor" className="nav-link">Blog Editor</NavLink>
                )}

            </div>
        );
    }
}
 