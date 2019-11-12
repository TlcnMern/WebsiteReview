import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetch} from '../../action/userAction';


class ViewProfie extends Component{

    componentWillMount(){
        this.props.fetch(this.props.userID);
    }

    render() {
        return(
            <div >
                <div className="row">
                    <div className="col-md-5">
                        <label>Họ tên</label>
                    </div>
                    <div className="col-md-5">
                        <p>{this.props.profile.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label>Email</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.props.profile.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label>Giới tính</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.props.profile.gender}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label>Ngày tham gia review</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.props.profile.created}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProp(state){
    return{
        profile: state.user.profile
    }
}

export default connect(mapStateToProp,{fetch})(ViewProfie);