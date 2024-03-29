import React, { Component } from 'react';
import "../../public/stylesheets/partials/profile.css"
import Tooltip from '@material-ui/core/Tooltip';
import ViewDetailProfile from '../user/ViewDetailProfile'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth, API_URL } from '../../config/helper';
import { checkFollow,countIndex } from '../../action/userAction';
import man from '../../public/images/man.png';
import { fetch, getPostUser } from '../../action/userAction';
import Loading from '../template/Loading';
import PostListUser from '../user/PostListUser';
import Follow from '../follow/Follow';

class profile extends Component {
    constructor(props) {
        super(props);
        this.match = props.match;
        this.state = {
            userId: this.match.params.userId,
            isLoading: true,
            renderProfile: false,
            renderPost: true,
            countIndex: {}
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
        countIndex(this.state.userId)
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
        getPostUser(this.state.userId)
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


    rendermyMenu() {
        //trường hợp guest xem info user
        if (this.props.isAuthenticated !== false) {
            if (auth.isAuthenticated().user._id === this.match.params.userId) {
                return (<Redirect to='/ViewProfile' />);
            }
        }

        if (this.state.renderPost)
            return (
                <div>
                    <ul className="nav">
                        <li className="actived"><span onClick={this.onClickPost} >BÀI VIẾT</span></li>
                        <li><span onClick={this.onClickProfile}>GIỚI THIỆU</span></li>
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
                        <li className="actived"><span onClick={this.onClickProfile} >GIỚI THIỆU</span></li>
                    </ul>
                    {this.props.profile ? <ViewDetailProfile /> : <div></div>}
                </div>
            );
    }

    render() {
        const avatar = this.props.profile.avatar;
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
                                    </div>
                                    <span className="viewprofile-name">{this.props.profile.name}</span>
                                    <p className="info"> {this.props.profile.email}</p>
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
                                            <span className="pointMember-c">Điểm uy tín: </span><br />
                                            <div className="pointMember-p">
                                                {this.props.profile.pointTrust && this.props.profile.pointTrust.reputation}
                                            </div>
                                        </div>
                                        <div className="pointMember">
                                            <span className="pointMember-c">Điểm đóng góp: </span><br />
                                            <div className="pointMember-e">{this.props.profile.pointTrust && this.props.profile.pointTrust.contribute}</div>
                                        </div>
                                        <div className="pointMember">
                                            <span className="pointMember-c">Điểm thành tích: </span><br />
                                            <div className="pointMember-f">{this.props.profile.pointTrust && this.props.profile.pointTrust.achievement}</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="right col-lg-8">
                                    <span><Follow followID={this.state.userId} /></span>
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

export default connect(mapToStateProps, { checkFollow, fetch })(profile);




