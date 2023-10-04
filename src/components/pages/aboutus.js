import React, { Component } from "react";
import image1 from "../../images/aboutusun.jpg";
import image2 from "../../images/aboutusdos.jpg";
import image3 from "../../images/aboutustres.jpg";
import image4 from "../../images/aboutuscuatro.jpg";
import image5 from "../../images/aboutuscinco.jpg";




export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      images: [image1, image2, image3, image4, image5]
    };
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  startInterval = () => {
    this.interval = setInterval(this.nextSlide, 2000);
  };

  stopInterval = () => {
    clearInterval(this.interval);
  };

  prevSlide = () => {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide - 1 + prevState.images.length) % prevState.images.length
    }));
    this.stopInterval();
    this.startInterval(); // Reinicia el intervalo después de cambiar la imagen manualmente
  };

  nextSlide = () => {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % prevState.images.length
    }));
  };


  render() {
    return (
      <div className="aboutus-container"> 

        <div className="left-aboutus">
          <div className="aboutus-title">
            <h2>About Us</h2>
          </div>
          <div className="aboutus-text">
            <p>
              We are a family dedicated to the care and cultivation of all kinds
              of cacti for over 25 years.
            </p>
            <p>
              Our journey began in a small greenhouse, where our love for these
              unique plants blossomed into a thriving business. Over the years,
              we've honed our skills and knowledge, ensuring that each cactus we
              nurture is of the highest quality.
            </p>
            <p>
              Today, our expansive cactus garden stands as a testament to our
              commitment to these extraordinary succulents.
            </p>
          </div>
        </div>

       
        <div className="right-aboutus">
          <div className="carousel-container">
            <div className="carousel-button carousel-button-left" onClick={this.prevSlide}>
              &lt;
            </div>
            <div className="carousel-images" style={{ transform: `translateX(-${this.state.currentSlide * 100}%)` }}>
              {this.state.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
              ))}
            </div>
            <div className="carousel-button carousel-button-right" onClick={this.nextSlide}>
              &gt;
            </div>
          </div>
        </div>

      </div>
    );
  }
}

