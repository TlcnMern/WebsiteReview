import React, { Component } from 'react';
import "../../public/stylesheets/partials/style.css"
import PostListUser from './PostListUser';
import ViewDetailProfile from './ViewDetailProfile';
import EditProfile from './EditProfile';
import FavoritePost from './FavoritePost';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { fetch, getPostUser, countIndex } from '../../action/userAction';
import { logout } from '../../action/authAction';

import { auth, API_URL } from '../../config/helper';
import man from '../../public/images/man.png';
import UploadAvatar from './UploadAvatar';
import Loading from '../template/Loading';

import jwt from 'jsonwebtoken';
import ViewFollow from '../follow/ViewFollow';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsUser: [],
            isLoading: true,
            renderProfile: false,
            renderFollow: false,
            renderPost: true,
            renderEdit: false,
            renderFavorite: false,
            openUploadAvatar: false,
            countIndex: {}
        };

        this.onClickProfile = this.onClickProfile.bind(this);
        this.onClickFollow = this.onClickFollow.bind(this);
        this.onClickPost = this.onClickPost.bind(this);
        this.onClickFavorite = this.onClickFavorite.bind(this);

        this.onClickButtonEdit = this.onClickButtonEdit.bind(this);
        this.onChangeRenderEdit = this.onChangeRenderEdit.bind(this);
        this.onClickAvatar = this.onClickAvatar.bind(this);
        this.callBackChangeStateOpen = this.callBackChangeStateOpen.bind(this);
    }
    componentDidMount() {
        const data = auth.isAuthenticated();
        //cho nay ma hoa token ra ==>admin thi chi dispatch admin va get avatar
        if (data) {
            jwt.verify(data.token, 'YOUR_secret_key', (err) => {
                if (err) {
                    this.props.logout()
                }
                else {
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
            });
        }
    }

    onClickProfile() {
        this.setState({
            renderProfile: true,
            renderFollow: false,
            renderPost: false,
            renderFavorite: false
        });
    };

    onClickFollow() {
        this.setState({
            renderProfile: false,
            renderFollow: true,
            renderPost: false,
            renderFavorite: false
        });
    };

    onClickFavorite() {
        this.setState({
            renderProfile: false,
            renderFollow: false,
            renderPost: false,
            renderFavorite: true
        });
    };

    onClickPost() {
        this.setState({
            renderProfile: false,
            renderFollow: false,
            renderPost: true,
            renderFavorite: false
        });
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
                        <li><span onClick={this.onClickFavorite}>yêu thích</span></li>
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
                        <li><span onClick={this.onClickFavorite}>yêu thích</span></li>
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
                        <li><span onClick={this.onClickFavorite}>yêu thích</span></li>
                    </ul>
                    <ViewFollow />
                </div>
            );
        if (this.state.renderFavorite)
            return (
                <div>
                    <ul className="nav">
                        <li><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                        <li><span onClick={this.onClickProfile} >About me</span></li>
                        <li><span onClick={this.onClickFollow}>Theo dõi</span></li>
                        <li className="actived"><span onClick={this.onClickFavorite}>yêu thích</span></li>
                    </ul>
                    <FavoritePost />
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

                        </header>
                        <main>
                            <div className="row">
                                <div className="left col-lg-4">
                                    <div className="photo-left">
                                        <img className="photo" src={urlAvatar} alt="img" />
                                        <button className="btnPhotoin-remove btnChangeAvatar" onClick={this.onClickAvatar} type="button"><img src="https://img.icons8.com/cute-clipart/24/000000/camera.png" alt="icCamera" /><br />Thay đổi ảnh đại diện</button>
                                        {this.state.openUploadAvatar ? <UploadAvatar callBackChangeStateOpen={this.callBackChangeStateOpen} open={this.state.openUploadAvatar} /> : <div></div>}
                                    </div>
                                    <span className="viewprofile-name">{this.props.profile.name}</span>
                                    <p className="info">{this.props.profile.email}</p>
                                    <div className="stats row">
                                        <div className="stat col-xs-4" style={{ paddingRight: '20px' }}>
                                            <p className="number-stat">{this.state.countIndex.numberFollower}</p>
                                            <p className="desc-stat">Followers</p>
                                        </div>
                                        <div className="stat col-xs-4">
                                            <p className="number-stat">{this.state.countIndex.numberFollowing}</p>
                                            <p className="desc-stat">Following</p>
                                        </div>
                                        <div className="stat col-xs-4" style={{ paddingLeft: '20px' }}>
                                            <p className="number-stat">{this.state.countIndex.numberPost}</p>
                                            <p className="desc-stat">Uploads</p>
                                        </div>
                                    </div>
                

                                            <Tooltip title="=======> Điểm phân cấp người dùng:&#013; &#010;
                                                        &#013; &#010;* Điểm tín nhiệm:&#013;
                                                            - Bài viết được người dùng đánh giá 5 sao(+1đ)&#013; &#010;
                                                            - Bài viết được trên 50 lượt yêu thích (+10)
                                                            * Điểm đóng góp:
                                                            - Đăng bài và được duyệt(+10đ)
                                                            - Đánh giá bài viết bất kỳ(+1đ)
                                                        * Điểm thành tích:
                                                            - Đăng bài và được duyệt(+10đ)
                                                            - Bài hát được vote yêu thích(+1đ)
                                                            - Được trên 20 người dùng đánh giá 1 bài viết (và điểm đánh giá trung bình > 4) (+10đ)">
                                                <span className="pointTrust"> Điểm uy tín </span>
                                            </Tooltip>
           
            
                                    <div className="row">
                                        <div className="pointMember">
                                            <span className="pointMember-c">Điểm uy tín </span><br />
                                            <div className="pointMember-p">
                                                {this.props.profile.pointTrust && this.props.profile.pointTrust.reputation}
                                            </div>
                                        </div>
                                        <div className="pointMember">
                                            <span className="pointMember-c">Điểm đóng góp </span><br />
                                            <div className="pointMember-e">{this.props.profile.pointTrust && this.props.profile.pointTrust.contribute}</div>
                                        </div>
                                        <div className="pointMember">
                                            <span className="pointMember-c">Điểm thành tích </span><br />
                                            <div className="pointMember-f">{this.props.profile.pointTrust && this.props.profile.pointTrust.achievement}</div>
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
        avatar: state.user.avatar
    }
}

export default connect(mapStateToProp, { fetch, logout })(ViewProfile);