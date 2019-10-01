import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetch} from '../../action/userAction';
import {auth} from '../../action/helper';

class ViewProfie extends Component{

    componentWillMount(){
        if(this.props.authenticate)
            this.props.fetch(auth.isAuthenticated().user._id);
    }

    render() {
        // if(!this.props.authenticate)
        //     return <Redirect to='/Login'/>;
        return(
            <div >
                <div class="row">
                    <div class="col-md-5">
                        <label>Họ tên</label>
                    </div>
                    <div class="col-md-5">
                        <p>{this.props.profile.name}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Email</label>
                    </div>
                    <div class="col-md-6">
                        <p>{this.props.profile.email}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Giới tính</label>
                    </div>
                    <div class="col-md-6">
                        <p>{this.props.profile.gender}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Ngày tham gia review</label>
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
        authenticate:state.auth.isAuthenticated,
        profile: state.user.profile//thằng user này là ở trong index của reducer đó
    }
}

export default connect(mapStateToProp,{fetch})(ViewProfie);