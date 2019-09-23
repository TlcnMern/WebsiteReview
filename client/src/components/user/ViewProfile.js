import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import {fetch} from '../../action/userAction';


class ViewProfie extends Component{

    componentWillMount(){
        const user=cookie.load('user');
        console.log(user._id);
        this.props.fetch(user._id);

    }

    render() {
        return(
            <div >
                <div class="row">
                    <div class="col-md-5">
                        <label>Email</label>
                    </div>
                    <div class="col-md-5">
                        <p>{this.props.profile.email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Tên</label>
                    </div>
                    <div class="col-md-6">
                        <p>{this.props.profile.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Ngày tạo</label>
                    </div>
                    <div class="col-md-6">
                        <p>{this.props.profile.created}</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProp(state){
    return{
        profile: state.user.profile//thằng user này là ở trong index của reducer đó
    }
}

export default connect(mapStateToProp,{fetch})(ViewProfie);