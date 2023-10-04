import React from "react";
import Axios from "axios";

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef(); // Add a reference to the textarea. I am using a reference object (this.textareaRef) using React.createRef(). This reference is associated with a DOM element and allows me to access and manipulate that element.
  }


  //handles form submission
  //I use Axios to make a POST request to the specified URL (form.action) with the render form data (FormSubmit)
  handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target; // Gets the form
    const formData = new FormData(form); // Create a FormData object with the form data

    Axios.post(form.action, formData)
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  
  render() {
    return (
      <form
        className="invoice-modal-container"
        action="https://formsubmit.co/6c9bf538a0b1ab7eb285c86de786e174"
        method="POST"
      >
        <p><strong>Check the order details and confirm the purchase</strong></p>
        <input
          className="invoice-modal-input"
          placeholder="Username"
          type="Username"
          name="name"
          required
          value={this.props.username}
        />
        <input
          className="invoice-modal-input"
          placeholder="email"
          type="email"
          name="email"
          required
          value={this.props.email}
        />
        <textarea
          className="invoice-modal-textarea"
          ref={this.textareaRef}
          name="invoiceDetails" 
          value={this.props.invoiceDetails}
          onChange={this.handleTextareaChange} 
        />
        <button className="invoice-modal-button" type="submit">
          Confirm Purchase
        </button>
      </form>
    );
  }
}

export default InvoiceModal;
