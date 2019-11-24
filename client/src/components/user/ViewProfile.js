import React, { Component } from 'react';
import "../../public/stylesheets/partials/style.css"
import PostListUser from './PostListUser';
import ViewDetailProfile from './ViewDetailProfile';
import EditProfile from './EditProfile';
import { connect } from 'react-redux';
import { fetch, getPostUser, countIndex } from '../../action/userAction';
import { auth, API_URL } from '../../config/helper';
import man from '../../public/images/man.png';
import UploadAvatar from './UploadAvatar';
import Loading from '../template/Loading';

import ViewFollow from '../follow/ViewFollow';

class viewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsUser: [],
            isLoading: true,
            renderProfile: false,
            renderFollow: false,
            renderPost: true,
            renderEdit: false,
            openUploadAvatar: false,
            countIndex: {}
        };

        this.onClickProfile = this.onClickProfile.bind(this);
        this.onClickFollow = this.onClickFollow.bind(this);
        this.onClickPost = this.onClickPost.bind(this);
        this.onClickButtonEdit = this.onClickButtonEdit.bind(this);
        this.onChangeRenderEdit = this.onChangeRenderEdit.bind(this);
        this.onClickAvatar = this.onClickAvatar.bind(this);
        this.callBackChangeStateOpen = this.callBackChangeStateOpen.bind(this);
    }
    componentDidMount() {
        if (this.props.authenticate)
            this.props.fetch(auth.isAuthenticated().user._id);
        countIndex(auth.isAuthenticated().user._id)
            .then(data => {
                if (data.error) {
                    console.log(data)
                }
                else {
                    this.setState({
                        countIndex: data
                    })
                }
            });

        getPostUser(auth.isAuthenticated().user._id)
            .then(data => {
                if (data.error) {
                    console.log(data);
                }
                else {
                    this.setState({
                        postsUser: data,
                        isLoading: false
                    })
                }
            })
    }

    onClickProfile() {
        this.setState({ renderProfile: true });
        this.setState({ renderFollow: false });
        this.setState({ renderPost: false });
    };

    onClickFollow() {
        this.setState({ renderFollow: true });
        this.setState({ renderProfile: false });
        this.setState({ renderPost: false });
    };

    onClickPost() {
        this.setState({ renderPost: true });
        this.setState({ renderFollow: false });
        this.setState({ renderProfile: false });
    };

    onClickButtonEdit() {
        this.setState({ renderEdit: true });
    };

    onClickAvatar() {
        this.setState({
            openUploadAvatar: true
        })
    }

    onChangeRenderEdit() {
        this.setState({ renderEdit: false });
        if (this.props.authenticate)
            this.props.fetch(auth.isAuthenticated().user._id);
    };

    callBackChangeStateOpen() {
        this.setState({
            openUploadAvatar: false
        })
    }

    renderViewOrEdit() {
        if (this.state.renderEdit)
            return <EditProfile onChangeRenderEdit={this.onChangeRenderEdit} />;
        else
            return (
                <div>
                    <ViewDetailProfile />
                    <div className="row rowProFile ">
                        <aside className="txtProfileCol "><label></label></aside>
                        <button className="btnSaveProfile" type="button" onClick={this.onClickButtonEdit}>Chỉnh Sửa</button>
                    </div>
                </div>
            );
    }

    rendermyMenu() {
        if (this.state.renderPost)
            return (
                <div>
                    <ul className="nav">
                        <li className="actived"><span onClick={this.onClickPost} >BÀI VIẾT</span></li>
                        <li><span onClick={this.onClickProfile}>About me</span></li>
                        <li><span onClick={this.onClickFollow}>Theo dõi</span></li>
                    </ul>
                    {this.state.isLoading ?
                        <Loading /> :
                        <PostListUser postsUser={this.state.postsUser} />
                    }
                </div>
            );
        if (this.state.renderProfile)
            return (
                <div>
                    <ul className="nav">
                        <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                        <li className="actived"><span onClick={this.onClickProfile} >About me</span></li>
                        <li><span onClick={this.onClickFollow}>Theo dõi</span></li>
                    </ul>
                    {this.renderViewOrEdit()}
                </div>
            );
        if (this.state.renderFollow)
            return (
                <div>
                    <ul className="nav">
                        <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                        <li><span onClick={this.onClickProfile} >About me</span></li>
                        <li className="actived"><span onClick={this.onClickFollow}>Theo dõi</span></li>
                    </ul>
                    <ViewFollow/>
                </div>
            );
    }

    render() {
        const avatar = this.props.avatar;
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
                                        <button className="btnPhotoin-remove btnChangeAvatar" onClick={this.onClickAvatar} type="button"><img src="https://img.icons8.com/cute-clipart/24/000000/camera.png" alt="icCamera" /></button>
                                        {this.state.openUploadAvatar ? <UploadAvatar callBackChangeStateOpen={this.callBackChangeStateOpen} open={this.state.openUploadAvatar} /> : <div></div>}
                                    </div>
                                    <h4 className="name">{this.props.profile.name}</h4>
                                    <p className="info">{this.props.profile.email}</p>
                                    <div className="stats row">
                                        <div className="stat col-xs-4" style={{ paddingRight: '50px' }}>
                                            <p className="number-stat">{this.state.countIndex.numberFollower}</p>
                                            <p className="desc-stat">Followers</p>
                                        </div>
                                        <div className="stat col-xs-4">
                                            <p className="number-stat">{this.state.countIndex.numberFollowing}</p>
                                            <p className="desc-stat">Following</p>
                                        </div>
                                        <div className="stat col-xs-4" style={{ paddingLeft: '50px' }}>
                                            <p className="number-stat">{this.state.countIndex.numberPost}</p>
                                            <p className="desc-stat">Uploads</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="right col-lg-8">
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
function mapStateToProp(state) {
    return {
        authenticate: state.auth.isAuthenticated,
        profile: state.user.profile,
        avatar:state.user.avatar
    }
}

export default connect(mapStateToProp, { fetch })(viewProfile);