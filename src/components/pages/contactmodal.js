import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";

ReactModal.setAppElement(".app-wrapper");

export default class ContactModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageTitle: "",
      userEmail: "",
      userMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);

    this.customStyles = {   //custom styles for the modal
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%",
        width: "500px",
        height: "500px",
      },
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)",
      },
    };
  }



  //handles changes to the form's input fields and updates the corresponding state based on the input name and its value.
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }


  //Runs when the user clicks the "Send" button
  //Gets the messageTitle, userEmail, and userMessage values of the state.
  handleSendClick() {
    const { messageTitle, userEmail, userMessage } = this.state;
  
    // We call the FormSubmit API  https://formsubmit.co/
    axios
      .post("https://formsubmit.co/6c9bf538a0b1ab7eb285c86de786e174", {
        name: messageTitle,
        email: userEmail,
        message: userMessage,
      })
      .then(() => {
        this.setState({
          messageTitle: "",
          userEmail: "",
          userMessage: "",
        });
        //close Modal
        this.props.handleModalClose();
      })
      .catch((error) => {
        console.error("Error al enviar el formulario", error);
      });
  }



  render() {
    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >

        <div className="modal-container">
          <div className="modal-form-title">
            <h1>Contact  Us</h1>
          </div>
          <div className="modal-contact-title">
            <input
              type="text"
              name="messageTitle"
              value={this.state.messageTitle}
              onChange={this.handleInputChange}
              placeholder="Title"
            />
          </div>
          <div className="modal-contact-email">
            <input
              type="email"
              name="userEmail"
              value={this.state.userEmail}
              onChange={this.handleInputChange}
              placeholder="Contact Email"
            />
          </div>
          <div className="modal-contact-textarea">
            <textarea
              name="userMessage"
              value={this.state.userMessage}
              onChange={this.handleInputChange}
              placeholder="Write your message here"
            ></textarea>
          </div>

          <div className="modal-contact-button">
            <button onClick={this.handleSendClick}>Send</button>
          </div>
        </div>        
      </ReactModal>
    );
  }
}
