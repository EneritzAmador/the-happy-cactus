import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; //Facebook, Twitter and Instagram Icons
import ContactModal from "./contactmodal.js";


export default class ContactPage extends Component {
  constructor() {
    super();

    this.state = {
      blogModalIsOpen: false,
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
  }


  //updates the state to close the modal.
  handleModalClose() {
    this.setState({
      blogModalIsOpen: false,
    });
  }

  //updates the state to open the modal.
  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true,
    });
  }

  render() {
    return (
      <div className="contact-container">

        <div className="contact-info">

          <h2>The Happy Cactus</h2>
          <p>Dirección: Plaza Arriaga, 48005, Bilbao, Vizcaya</p>
          <p>Teléfono: (123) 456-7890</p>
          <p>Email: happycactus@test.com</p>

          <div className="social-links">
            <div className="icon">
              <a href="https://www.facebook.com/happycactustestprojectfalselink">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
            <div className="icon">
              <a href="https://twitter.com/happycactustestprojectfalselink">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <div className="icon">
              <a href="https://www.instagram.com/happycactustestprojectfalselink">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>          
          </div>

          <div className="contact-button">
            <button
              className="send-message-button"
              onClick={this.handleNewBlogClick}
            >
              Send Message
            </button>
            <ContactModal
              handleModalClose={this.handleModalClose}
              modalIsOpen={this.state.blogModalIsOpen}
            />
          </div>
        </div>


        <div className="map-container">
          <iframe
            title="Happy Cactus Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.604400396122!2d-2.927623224300872!3d43.25971217779225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e4fce6009aa7f%3A0xc1f93a253cfef177!2sPl.%20del%20Arriaga%2C%2048005%20Bilbao%2C%20Vizcaya!5e0!3m2!1ses!2ses!4v1695453470099!5m2!1ses!2ses"
            width="300"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
  }
}

