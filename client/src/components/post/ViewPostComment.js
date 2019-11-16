import React, {Component} from 'react';
import Comment from '../comment/Comment';
import {auth} from '../../action/helper';
import {checkRatingAndShow} from '../../action/postAction';
import {connect} from 'react-redux';
import {getComment} from '../../action/postAction';

class ViewPostComment extends Component{
    state={
        img:'',
        isLoading:false,
        point:null
    }
    componentDidMount(){
        const { post } = this.props.location.state;
        if(this.props.isAuthenticated){
            const jwt=auth.isAuthenticated();
            const userID=jwt.user._id;
            checkRatingAndShow(userID,{t:jwt.token},post._id).then((data)=>{
                if(data===null){
                    this.setState({
                        isLoading:true,
                        point:null
                    });
                }
                else{
                    if(data.error){ 
                        console.log(data.error);
                    }
                    else{
                        this.setState({
                            isLoading:true,
                            point:data
                        })
                    }
                }
            });
        }
        this.props.getComment(post._id)
    }
    render(){
        var  post ={};
        if(this.props.location.state.post){
             post  = this.props.location.state.post;
        }
        return(
            <div className="CommentBV">
                <Comment postId={post._id}/> 
                {post._id}
            </div>
        );
        
    } 
} 
function mapToStateToProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated,
        pointRateOfUser:state.post.pointRateOfUser
    }
}


export default connect(mapToStateToProps,{getComment})(ViewPostComment) ;