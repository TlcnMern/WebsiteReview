import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/helper';
import man from '../../public/images/man.png';
import Rating from '../rating/Rating';
class ViewPostFeatured extends Component {

    state = {
        post: this.props.post
    }

    render() {
        const avatar = this.state.post.postedBy.avatar;
        var urlAvatar = '';
        if (avatar) {
            if (avatar.includes('dist')) {
                urlAvatar = API_URL + '/' + avatar;
            }
            else {
                urlAvatar = avatar;
            }
        }
        else {
            urlAvatar = man;
        }
        return (
            <div style={{ marginTop: '30px' }} className="row clsBVNT">
                <div className="col-sm-5 ">
                    <div className="imgDD ">
                        <img src={`${API_URL}/` + this.state.post.photo[0]} alt="imgDemo1 " />
                        <div style={{ fontSize: '7px',marginLeft:'-5px',width:'75px' }}>
                        {/* Rating Point: {this.state.post.pointRating.point} point/{this.state.post.pointRating.oneStar+this.state.post.pointRating.twoStar+
                        this.state.post.pointRating.threeStar+this.state.post.pointRating.fourStar+this.state.post.pointRating.fiveStar||0}vote */}
                            <Rating rating={this.state.post.pointRating.point - 1} disabled={true} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-7 " id="detailBVNT">

                    <Link id="TitleBVNT" to={
                            {
                                pathname: `/DetailPost/${this.state.post._id}`
                            }
                        }>
                    {this.state.post.title}</Link>
                    
                    <div className="BVNT-Detail">
                        <Link to={
                            {
                                pathname: `/GuestViewProfile/${this.state.post.postedBy._id}`
                            }
                        }>
                            <img style={{ marginRight: '5px' }} width="18px " height="18px" className="user_avatar_link " src={urlAvatar} alt="imageuser" />
                            <span style={{fontSize:'13px', color:'#90949c'}}>{this.state.post.postedBy.name}</span>
                        </Link>
                        <br/>
                        <span style={{fontSize:'13px',color:'#90949c', marginBottom:'.5rem' }}>
                            <i className="fa fa-calendar" aria-hidden="true" style={{marginRight:'10px',fontSize:'18px',height:'18px',width:'18px'}}/>

                            {new Intl.DateTimeFormat('en-GB', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(this.state.post.created))}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPostFeatured
