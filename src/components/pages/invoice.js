import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InvoiceModal from "./invoicemodal";
import ReactModal from "react-modal";

ReactModal.setAppElement(".app-wrapper");


class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      nombreApellidoRef: React.createRef(),  //References (React.createRef()) are used to access the values of the input fields in the form.
      direccionEnvioRef: React.createRef(),
      telefonoContactoRef: React.createRef(),
      tarjetaVisaRef: React.createRef(),
      caducidadTarjetaRef: React.createRef(),
      cscRef: React.createRef(),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


  //builds the invoice text
  //Extracts user, cart, and total information, and then organizes it into readable text.
  constructInvoiceText = () => {
    const { user, cart, total } = this.props.location.state || {};
    const totalConEnvio = parseFloat(total) + 5;

    let invoiceText = "";

    if (user) {
      console.log("Username:", user.username);
      console.log("Email:", user.email);

      invoiceText += `Datos de Perfil\n`;
      invoiceText += `Username: ${user.username}\n`;
      invoiceText += `Email: ${user.email}\n\n`;
    }

    // Getting field values using references
    const nombreApellidoValue = this.state.nombreApellidoRef.current.value;
    const direccionEnvioValue = this.state.direccionEnvioRef.current.value;
    const telefonoContactoValue = this.state.telefonoContactoRef.current.value;
    const tarjetaVisaValue = this.state.tarjetaVisaRef.current.value;
    const caducidadTarjetaValue = this.state.caducidadTarjetaRef.current.value;
    const cscValue = this.state.cscRef.current.value;

    // Adding the values to the invoice text
    invoiceText += `Datos de Envio y Pago\n`;
    invoiceText += `${nombreApellidoValue}\n`;
    invoiceText += `${direccionEnvioValue}\n`;
    invoiceText += `${telefonoContactoValue}\n`;
    invoiceText += `${tarjetaVisaValue}\n`;
    invoiceText += `${caducidadTarjetaValue}\n`;
    invoiceText += `${cscValue}\n\n`;

    invoiceText += `Productos\n`;
    cart.forEach((item) => {
      invoiceText += `Articulo: ${item.name}\n`;
      invoiceText += `Cantidad: ${item.quantity}\n`;
      invoiceText += `Precio unitario: ${item.price}\n`;
      invoiceText += `Total: ${(parseFloat(item.price) * item.quantity).toFixed(
        2
      )}€\n\n`;
    });

    invoiceText += `Total a Pagar\n`;
    invoiceText += `${total}\n\n`;

    invoiceText += `Gastos de Envio\n`;
    invoiceText += `En envio será por CorreosExpress y se le notificará el plazo y en envio por a su Email una vez confirmemos el pago\n`;
    invoiceText += `+5€ gastos de envío\n\n`;

    invoiceText += `Total más Gastos de Envio\n`;
    invoiceText += `${totalConEnvio.toFixed(2)}€\n`;

    this.setState({ invoiceText });
  };



  //Avoid the default behavior of the event and open the modal
  //Call constructInvoiceText() to construct the invoice text.
  handleSubmit(e) {
    e.preventDefault();
  
    const { cart, total } = this.props.location.state || {};
    const totalConEnvio = parseFloat(total) + 5;
  
    console.log("isModalOpen:", this.state.isModalOpen);
  
    this.setState({ isModalOpen: true });
    this.constructInvoiceText(); //Call the function to construct the invoice text
  }
  

  //Closes the modal by changing the state of isModalOpen to false.
  handleCloseModal() {
    this.setState({ isModalOpen: false });
  }



  render() {
    { /* Here information about the user, shopping cart, and invoice total is extracted from the component's location properties. Then calculate the total with an additional shipping cost of 5. */ }
    const { user, cart, total } = this.props.location.state || {};
    const totalConEnvio = parseFloat(total) + 5;

    return (
      <div className="invoice-container">
        <h1>Invoice</h1>         
        <div className="invoice">

          <div className="left-invoice">

            <h2>Profile Data</h2>
            <div>
              {user && (
                <div>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              )}

              <h2>Shipping and Payment Data</h2>
              <div>
                <input
                  type="text"
                  className="nombreApellido input-style"
                  name="nombreApellido"
                  placeholder="Name and surname for shipping"
                  maxLength="100"
                  required
                  ref={this.state.nombreApellidoRef}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="direccionEnvio input-style"
                  name="direccionEnvio"
                  placeholder="Shipping Address"
                  maxLength="300"
                  required
                  ref={this.state.direccionEnvioRef}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="telefonoContacto input-style"
                  name="telefonoContacto"
                  placeholder="Contact Phone"
                  pattern="[0-9]{1,15}"
                  inputMode="numeric"
                  required
                  ref={this.state.telefonoContactoRef}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="tarjetaVisa input-style"
                  name="tarjetaVisa"
                  placeholder="Visa Card"
                  pattern="[0-9]{1,16}"
                  inputMode="numeric"
                  required
                  ref={this.state.tarjetaVisaRef}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="caducidadTarjeta input-style"
                  name="caducidadTarjeta"
                  placeholder="Card Expiration"
                  pattern="[0-9]{1,4}"
                  inputMode="numeric"
                  required
                  ref={this.state.caducidadTarjetaRef}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="csc input-style"
                  name="csc"
                  placeholder="Security Code (CSC)"
                  pattern="[0-9]{1,3}"
                  inputMode="numeric"
                  required
                  ref={this.state.cscRef}
                />
              </div>
            </div>
          </div>

          <div className="right-invoice">
            {/* Creates a list of products in the cart, showing the name, quantity, unit price and total for each of them. */}
            <h2>Products</h2>
            {cart &&
              cart.map((item) => (
                <div className="product" key={item.id}>
                  <div className="product-details">
                    <p>Item: {item.name}</p>
                    <p>Units: {item.quantity}</p>
                    <p>Unit Price: {item.price}</p>
                  </div>
                  <div className="product-total">
                    <p>
                      Total:{" "}
                      {(parseFloat(item.price) * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                </div>
              ))}
            <h2>Total to Pay</h2>
            <p>{total}</p>
            <div>
              <h2>Shipping Costs</h2>
              <p>
              Shipping will be by CorreosExpress and you will be notified of the delivery time and shipping by email once we confirm the payment.
              </p>
              <p>+5€ Shipping costs</p>
            </div>
            <div>
              <h2>Total + Shipping Costs</h2>
              <p>{totalConEnvio.toFixed(2)}€</p>
            </div>
          </div>
        </div>
        <button
          onClick={this.handleSubmit}
          className="invoice-button"
          type="submit"
        >
          Send Data
        </button>

        <ReactModal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              marginRight: "-50%",
              marginLeft: "-350px", 
              marginTop: "-320px",
              height: "600px",
              width: "700px",
            },
            overlay: {
              backgroundColor: "rgba(1, 1, 1, 0.75)",
            },
          }}
          onRequestClose={this.handleCloseModal}
          isOpen={this.state.isModalOpen}
        >
          <InvoiceModal
            modalIsOpen={this.state.isModalOpen}
            handleModalClose={this.handleCloseModal}
            username={user ? user.username : ""}
            email={user ? user.email : ""}
            invoiceDetails={this.state.invoiceText}
          />
        </ReactModal>
        {this.state.isModalOpen && (
          <InvoiceModal
            modalIsOpen={this.state.isModalOpen}
            handleModalClose={this.handleCloseModal}
            invoiceDetails={this.state.invoiceText} // Pass invoice text
          />
        )}
      </div>
    );
  }
}

export default withRouter(Invoice);
