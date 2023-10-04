import React, { Component } from "react";
import axios from "axios";


export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "",      //store the text that the user has entered in the search field
      searchResults: [],    //stores search results
      showResults: false,   //to control if search results are being displayed
    };


    this.searchContent = this.searchContent.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.closeResults = this.closeResults.bind(this);
  }


  //Updates the searchQuery state every time the user types something in the search field
  handleSearchChange(e) {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }


  //Controls when the user presses a key
  handleKeyPress(e) {
    if (e.key === "Enter" && this.state.searchQuery.length > 2) {
      this.searchContent(this.state.searchQuery);
      this.setState({ showResults: true });  // show the results
    }
  }


  //closes the search results by setting the showResults state to false.
  closeResults() {
    this.setState({ showResults: false });
  }


  //Make a GET request to my API that returns information about blogs
  //When the response comes in, filter the results based on whether the title or content
  searchContent(query) {
    axios
      .get(`https://cactus-api-blog2-c3df13e82454.herokuapp.com/getblogs`)
      .then(function(response) {
        const results = response.data.filter(function(blog) {
          return (
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.content.toLowerCase().includes(query.toLowerCase())
          );
        });
        this.setState({ searchResults: results });
      }.bind(this))
      .catch(function(error) {
        console.error("No hay resultados", error);
      });
  }

  render() {
    const { searchQuery, searchResults, showResults } = this.state;

    return (
      <div className="homepage-container">
        <div className="text-container">
          <h1 className="large-text">Do you need a gift idea?</h1>
          <p className="small-text">
          We are the best store for Cactus fans. Search for information about them in the search bar
          </p>

          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Search"
            />
            {showResults && (
              <button className="close-results" onClick={this.closeResults}>
                X
              </button>
            )}
          </div>         

          {showResults && (
            <div className="search-results">
              {searchResults.map((result) => (
                <div key={result.id}>
                  <h3>{result.title}</h3>
                  <p>{result.content}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    );
  }
}
