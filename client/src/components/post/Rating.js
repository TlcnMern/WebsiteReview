import React, { Component } from 'react';
import '../../public/stylesheets/partials/rating.scss'
import PropTypes from 'prop-types';
import {addRating} from '../../action/postAction';
import {auth} from '../../action/helper';
class Rating extends Component{
  static propTypes= {
      disabled:  PropTypes.bool
    };
    constructor(props){
        super(props);
        this.state={
            rating: this.props.rating || null,
            disabled: this.props.disabled || false,
            temp_rating: null
        }
    }
    componentWillReceiveProps(){
        this.setState({rating:this.props.rating})
    }
    rate(rating) {
      const jwt=auth.isAuthenticated();
      const userID=jwt.user._id;
      
      addRating(userID,{
          t:jwt.token
      },this.props.idPost,rating).then((data)=>{
          if(data.error){
              console.log(data);
              return;
          }
          else{
            this.setState({
              rating: rating,
              temp_rating: rating
            });
          }
      })

    };
    star_over(rating) {
      this.setState({
        rating:rating,
        temp_rating:this.state.rating
      });
    };
    star_out() {
      this.setState({ rating: this.state.temp_rating });
    };
    render() {
      var stars = [];
      if(this.props.disabled){
        for(var i = 0; i < 5; i++) {
          var klass = 'star-rating__star';
          
          if (this.state.rating >= i && this.state.rating != null) {
            klass += ' is-selected';
          }
    
          stars.push(
            <label
              key={i}
              className={klass}>
              ★
            </label>
          );
        }
      }
      else{
        for(var j = 0; j < 5; j++) {
          var kla = 'star-rating__star';
          if (this.state.rating >= j && this.state.rating != null) {
            kla += ' is-selected';
          }
    
          stars.push(
            <label
              key={j}
              className={kla}
              onClick={this.rate.bind(this, j)}
              onMouseOver={this.star_over.bind(this, j)}
              onMouseOut={this.star_out.bind(this)}>
              ★
            </label>
          );
        }
    }
      
      return (
        <div className="star-rating">
          {stars}
        </div>
      );
    }
}     

export default Rating

