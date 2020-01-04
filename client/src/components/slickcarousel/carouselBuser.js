import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItemBU from "./carditemBuser";
import { getTopUser } from '../../action/userAction';
import Loading from '../template/Loading';

export default class MultipleItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    }

  }
  componentDidMount(){
    getTopUser()
      .then(data => {
        if (data.error) {
          console.log(data)
        }
        else {
          console.log(data)
          this.setState({
            users: data
          })
        }
      });
  }

  render() {
    if (!this.state.users) {
      return <Loading />
    }
    else {
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow:4,
        autoplay: true,
        speed: 3500,
        autoplaySpeed: 5000,
        slidesToScroll:  1
      };
      return (

        <div className="thumbnailgallery ">
          <Slider {...settings}>
            {this.state.users ? this.state.users.map((item) => {
              return (  
                <CardItemBU user={item} key={item._id} />)
            }) : <Loading/>
            }
          </Slider>
        </div>
      );
    }
  }
}