import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../config/helper';
import man from '../../../public/images/man.png'

class ViewUserRanking extends Component {

    render() {
        var avatar = this.props.user._id.postedBy.avatar
        var urlAvatar;
        if (avatar) {
            if (avatar.includes('dist')) {
                urlAvatar = API_URL.toString() + "/" + avatar.toString();
            }
            else {
                urlAvatar = avatar;
            }
        }
        else {
            urlAvatar = man;
        }
        return (
            <div className="clsTop row top-User">
                <div className="col-sm-1"><i className="fa fa-newspaper-o" aria-hidden="true" /></div>
                <div className="row col-sm-9">
                    <div className="col-sm-4 top-Avatar">
                        <img className="anhdd" src={urlAvatar} style={{ maxWidth: '30px', height: '30px', marginRight: '5px', borderRadius: '50%' }} aria-hidden alt="Picture of me taking a photo of an image" />
                    </div>
                    <div className="col-sm 8 top-Detail row">
                        <div className="top-DetailTitle"><Link to="GuestViewProfile">{this.props.user._id.postedBy.name}</Link></div>

                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="top-Content">
                        <span>{this.props.user.count}post</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewUserRanking



