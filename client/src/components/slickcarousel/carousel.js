import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from "./carditem";
import { getTopListPostFollowTheme } from '../../action/postAction';
import Loading from '../template/Loading';

export default class MultipleItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
      posts: []
    }

  }
  componentDidMount(){
    getTopListPostFollowTheme(this.state.theme)
      .then(data => {
        if (data.error) {
          console.log(data)
        }
        else {
          this.setState({
            posts: data
          })
        }
      });
  }

  render() {
    if (!this.state.posts) {
      return <Loading />
    }
    else {
      const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow:4,
        slidesToScroll:  this.state.posts.length
      };
      return (

        <div className="thumbnailgallery ">
          <Slider {...settings}>
            {this.state.posts ? this.state.posts.map((item, i) => {
              return (  
                <CardItem post={item} key={i} />)
            }) : <div></div>
            }
          </Slider>
        </div>
      );
    }
  }
}