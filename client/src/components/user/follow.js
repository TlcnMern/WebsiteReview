import React, {Component} from 'react';
import {connect} from 'react-redux';
import { auth } from '../../action/helper';
import {follow,unFollow} from '../../action/userAction';

class Follow extends Component{
    constructor(){
        super();
        this.clickFollowButton=this.clickFollowButton.bind(this);
        this.cliclUnFollowButton=this.cliclUnFollowButton.bind(this);
    }

    clickFollowButton(){
        if(!this.props.isAuthenticated){
            window.location.href="http://localhost:3000/Login";
        }
        const jwt = auth.isAuthenticated()
        this.props.follow(jwt.user._id,{t:jwt.token},this.props.followID)
      }
    cliclUnFollowButton(){
        const jwt = auth.isAuthenticated()
        this.props.unFollow(jwt.user._id,{t:jwt.token},this.props.followID)
    }

    render(){
        return(
            <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">              

            { !this.props.isFollow
                ? (<button id="btn-contact" data-toggle="modal" onClick={this.clickFollowButton} data-target="#contact" className="btn btn-success btn-block follow">Theo dõi</button> )
                : (<button id="btn-contact" data-toggle="modal" onClick={this.cliclUnFollowButton} data-target="#contact" className="btn btn-success btn-block follow">Bỏ theo dõi</button> )
            }               
            </div>             
        );
    }
}

function mapToStateProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated,
        isFollow: state.user.isFollow
    }
}

export default connect(mapToStateProps,{follow,unFollow})(Follow)