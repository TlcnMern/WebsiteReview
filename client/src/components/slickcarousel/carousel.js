import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from "./carditem"

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <div className="thumbnailgallery ">
        <Slider {...settings}>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
          <div>
            <h3><CardItem/></h3>
          </div>
        </Slider>
      </div>
    );
  }
}