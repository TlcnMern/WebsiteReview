import React, { Component } from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePost from './profilePost';
import ProfileDetail from './profileDetail'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth,API_URL } from '../../action/helper';
import { checkFollow } from '../../action/userAction';
import man from  '../../public/images/man.png';
import { fetch } from '../../action/userAction';

import Follow from '../user/follow';
//khi gọi tới thằng này bằng redirect hoặc link, phải truyền cho nó 1 props là UserID
class profile extends Component {
    constructor(props) {
        super(props);
        this.match=props.match;
        this.state = {
            userId: this.match.params.userId,
            renderProfile: false,
            renderPost: true
        };
        this.onClickProfile = this.onClickProfile.bind(this);
        this.onClickPost = this.onClickPost.bind(this);
    }
    onClickProfile() {
        this.setState({ renderProfile: true });
        this.setState({ renderPost: false });
    };
    onClickPost() {
        this.setState({ renderPost: true });
        this.setState({ renderProfile: false });
    };

    componentDidMount() {
        if (this.props.isAuthenticated === true) {
            const jwt = auth.isAuthenticated();
            this.props.checkFollow(jwt.user._id, { t: jwt.token }, this.state.userId);
        }
        this.props.fetch(this.state.userId);
    }


    rendermyMenu() {

        //trường hợp coi chính mình
        if (auth.isAuthenticated().user._id === this.match.params.userId) {
            return (<Redirect to='/ViewProfile' />);
        }

        if (this.state.renderPost)
            return (
                <div>
                    <ul className="nav">
                        <li className="actived"><span onClick={this.onClickPost} >BÀI VIẾT</span></li>
                        <li><span onClick={this.onClickProfile}>About me</span></li>
                    </ul>
                    <ProfilePost />
                </div>
            );
        if (this.state.renderProfile)
            return (
                <div>
                    <ul className="nav">
                        <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                        <li className="actived"><span onClick={this.onClickProfile} >About me</span></li>
                    </ul>
                    {this.props.profile ? <ProfileDetail /> : <div></div>}
                </div>
            );
    }

    render() {
        const avatar = this.props.profile.avatar;
        var urlAvatar='';
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
            <div>
                <div className="boxContent">
                    <div className="container">
                        <header>
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </header>
                        <main>
                            <div className="row">
                                <div className="left col-lg-4">
                                    <div className="photo-left">
                                        <img className="photo" src={urlAvatar} alt="img" />
                                        <div className="active"></div>
                                    </div>
                                    <h4 className="name">{this.props.profile.name}</h4>
                                    <p className="info">BIỆT DANH</p>
                                    <p className="info"> {this.props.profile.email}</p>
                                    <div className="stats row">
                                        <div className="stat col-xs-4" style={{ paddingRight: '50px' }}>
                                            <p className="number-stat">3,619</p>
                                            <p className="desc-stat">Followers</p>
                                        </div>
                                        <div className="stat col-xs-4">
                                            <p className="number-stat">42</p>
                                            <p className="desc-stat">Following</p>
                                        </div>
                                        <div className="stat col-xs-4" style={{ paddingLeft: '50px' }}>
                                            <p className="number-stat">38</p>
                                            <p className="desc-stat">Uploads</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="right col-lg-8">
                                    <span className="follow"><Follow followID={this.state.userId} /></span>
                                    {this.rendermyMenu()}


                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            </div>

        );
    }
}
function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profile: state.user.profile
    }
}

export default connect(mapToStateProps, { checkFollow,fetch })(profile);




