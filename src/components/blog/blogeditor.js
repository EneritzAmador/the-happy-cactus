import React, { Component } from "react";
import axios from "axios"; 

export default class BlogEditor extends Component {
  constructor() {
    super();
  
    this.state = {  
      title: "",
      content: "",
      image: "", 
    };
  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this); 
  }
  


  //Updates the state of the component when a change occurs to the input fields
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

 
  //Runs when the form is submitted
  //Creates a FormData object and sends a POST request to my API to create a new blog.
  handleSubmit(event) {
    event.preventDefault();
  
    console.log("Submit button clicked");
  
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("image", this.state.image);
  
    axios
      .post(
        "https://cactus-api-blog2-c3df13e82454.herokuapp.com/create_blog",
        formData
      )
      .then(function (response) {
        console.log("Blog creado con éxito:", response.data);
  
        this.setState({
          title: "",
          content: "",
          image: "",
        });
      }.bind(this))
      .catch(function (error) {
        console.error("Error al crear el blog:", error);
      });
  }


  render() {
    return (
      <div className="blog-editor-container">

        <div className="editor-title">Admin Blog Editor</div>

        <div className="editor-field">
          <input
            type="text"  
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>

        <div className="editor-field">
          <textarea
            placeholder="Content"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          ></textarea>
        </div>

        <div className="editor-field">
          <input
            type="text"  
            placeholder="Image URL" 
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
          />
        </div >

        <div className="button-editor">
        <button className="editor-button" onClick={this.handleSubmit}>
          Save
        </button>
        </div>
        
      </div>
    );
  }
}


