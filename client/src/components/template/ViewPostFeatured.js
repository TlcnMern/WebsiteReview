import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../action/helper';
import man from '../../public/images/man.png';
import Rating from '../post/Rating';
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
                        <span style={{ fontSize: '7px' }}>
                        {/* Rating Point: {this.state.post.pointRating.point} point/{this.state.post.pointRating.oneStar+this.state.post.pointRating.twoStar+
                        this.state.post.pointRating.threeStar+this.state.post.pointRating.fourStar+this.state.post.pointRating.fiveStar||0}vote */}
                            <Rating rating={this.state.post.pointRating.point - 1} disabled={true} />
                        </span>
                    </div>
                </div>
                <div className="col-sm-7 " id="detailBVNT">
                    <Link to="DetailPost" id="TitleBVNT">{this.state.post.title}</Link>
                    
                    <div className="text-muted " style={{ display: 'table-cell', verticalalign: 'middle', lineheight: '25px' }}>
                        <Link to={
                            {
                                pathname: `/GuestViewProfile/${this.state.post.postedBy._id}`
                            }
                        }>
                            <img style={{ marginRight: '5px' }} width="18px " height="18px" className="user_avatar_link " src={urlAvatar} alt="imageuser" />
                            <span style={{fontSize:'10px'}}>{this.state.post.postedBy.name}</span>
                        </Link>
                        <span style={{ marginLeft: '10px',fontSize:'9px' }}>
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
