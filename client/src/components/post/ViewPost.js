import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../rating/Rating';
import { API_URL } from '../../action/helper';

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            point: null
        };

    }

    onClickComment() {
        this.setState({ renderComment: true });
    };
    render() {
        return (
            <div className="row clsNEWFEED fadeInDown">
                <Link to="Theme" id="btnDetailTheme"><span style={{ textTransform: 'capitalize' }}>{this.props.post.theme}</span></Link>
                <div className="col-sm-3">
                    <div className="imgDD FadeIn-load">
                        <img id="imgSP" src={`${API_URL}/`+this.props.post.photo[0]} alt="imgDemo1" /><br />
                        <Link to="SearchSP">{this.props.post.productReview}</Link>
                    </div>
                </div>
                <div className="col-sm-9 detail-NEWFEED FadeIn-load">
                    <div className="detail-Title">
                        <Link to={
                            {
                                pathname: `/DetailPost/${this.props.post._id}`
                            }
                        }>
                            <span className="txt-NameBV">{this.props.post.title}</span>
                        </Link>
                        <span className="tooltiptext">{this.props.post.title}</span>
                    </div>

                    <br />
                    <div className="text-muted">

                        <Link to={
                            {
                                pathname: `/GuestViewProfile/${this.props.post.postedBy._id}`
                            }
                        }>
                            <span title={this.props.post.postedBy.name}> <img width="22px " height="22px " className="user_avatar_link " src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05" alt="Nguyễn Tuấn Vũ " /></span>
                            <span style={{ marginLeft: '10px' }}>{this.props.post.postedBy.name}</span>
                        </Link>

                        {new Intl.DateTimeFormat('en-GB', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        }).format(new Date(this.props.post.created))}

                    </div>
                    <p>{this.props.post.contentSummary}</p>
                    <div className="rateBar">
                        <span className="rateBar-Like"><img src="https://img.icons8.com/ios/20/000000/like.png" alt="Like" /></span>
                        <span className="rateBar-Comment" >
                            <img src="https://img.icons8.com/ios/20/000000/comments.png" alt="Comment" />
                        </span>
                        <span>
                        <span> <Rating rating={this.props.post.pointRating.point-1} disabled={true} /></span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pointRateOfUser: state.post.pointRateOfUser
    }
}

export default connect(mapToStateProps)(ViewPost);