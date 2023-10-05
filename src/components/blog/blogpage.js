import React, { Component } from "react";
import axios from "axios";

export default class BlogContainer extends Component {
  _isMounted = false //to control whether the component is mounted or not.
  constructor() {
    super();

    this.state = {
            data: [], //Initializes the component state with a title and an empty array called data.
    };

    this.originalData = []; //to store a copy of the original state.

    this.handleFilter = this.handleFilter.bind(this);
  }

  
  //filter the blogs
  //If the filter is "CLEAR_FILTERS", it restores the original state, otherwise it filters the blogs.
  handleFilter(filter) {
    if (filter === "CLEAR_FILTERS") {
      this.setState({ data: this.originalData }); 
    } else {
      const filteredData = this.originalData.filter((item) => {
        return item.title.toLowerCase().includes(filter.toLowerCase());
      });
      this.setState({ data: filteredData });
      this.blogEntries = this.blogEntries.bind(this);
    }
  }

  
  //runs after the component is mounted
  componentDidMount() {
    this._isMounted = true;
    // Make a GET request to the API to get the blogs
    axios.get('https://cactus-api-blog2-c3df13e82454.herokuapp.com/getblogs')
      .then(response => {
        this.originalData = response.data; // Store a copy of the original state
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error('Error al obtener los blogs:', error);
      });
  }


  //executed when the component is to be unmounted
  componentWillUnmount() {
    this._isMounted = false;
  }


  //method that maps over the blogs in the state and returns a JSX that shows the title, content and an image if it exists.
  blogEntries() {
    return this.state.data.slice().reverse().map((item) => {
      return (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          {item.image && <img src={item.image} alt={item.title} />} {/* Renderiza la imagen si existe */}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="blogpage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => this.handleFilter("Como cuidar un cactus")}
          >
            Cuidando Cactus
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Tipos de Cactus")}
          >
            Tipos de Cactus
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Cactus de Navidad")}
          >
            Cactus de Navidad
          </button>
          <button
            className="btn"
            onClick={() =>
              this.handleFilter("Los cactus son plantas suculentas")
            }
          >
            Plantas suculentas
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            Mostrar Todos
          </button>
        </div>
        <div className="blog-entries-wrapper">{this.blogEntries()}</div>
      </div>
    );
  }
}
 