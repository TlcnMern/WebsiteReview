import React, { Component } from 'react';
import ListUserFollow from './ListUserFollow';
import { connect } from 'react-redux';

class ViewFollow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderFollower: true,
            renderFollowing: false
        };
        this.onClickFollwer = this.onClickFollwer.bind(this);
        this.onClickFollowing = this.onClickFollowing.bind(this);
    }
    onClickFollwer() {
        this.setState({
            renderFollower: true,
            renderFollowing: false
        });
    };

    onClickFollowing() {
        this.setState({
            renderFollower: false,
            renderFollowing: true
        });
    };
    render() {
        // <div>alo</div>
        if (this.state.renderFollower)
            return (
                <div style={{ paddingBottom: '100px',marginTop:'-40px' }}>
                    <div>
                        <ul className="nav">
                            <li className="actived"><span onClick={this.onClickFollwer}>Người theo dõi</span></li>
                            <li><span onClick={this.onClickFollowing}>Đang theo dõi</span></li>
                        </ul>
                    </div>
                    <div>
                        <ListUserFollow users={this.props.profile.followers} />
                    </div>
                </div>
            );
        if (this.state.renderFollowing)
            return (
                <div style={{ paddingBottom: '100px',marginTop:'-40px' }}>
                    <div>
                        <ul className="nav">
                            <li><span onClick={this.onClickFollwer}>Người theo dõi</span></li>
                            <li className="actived"><span onClick={this.onClickFollowing}>Đang theo dõi</span></li>
                        </ul>
                    </div>
                    <div>
                        <ListUserFollow users={this.props.profile.following} />
                    </div>
                </div>
            );
    }
}

function mapStateToProp(state) {
    return {
        authenticate: state.auth.isAuthenticated,
        profile: state.user.profile
    }
}
export default connect(mapStateToProp)(ViewFollow);