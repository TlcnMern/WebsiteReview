import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { deleteComment } from '../../action/postAction';
import { connect } from 'react-redux';
import EditComment from  './EditComment';
import SubComment from  './SubComment';
import {checkAuthorizedComment} from '../../action/authAction';

class ViewComment extends Component {


    state = {
        comment:this.props.comment||{},
        content: '',
        listSubComment: this.props.comment.subComment || [],
        edit:false
    };
    componentWillMount(){
        if(this.props.isAuthenticated){
            const jwt=auth.isAuthenticated();
            const userID=jwt.user._id;
            this.props.checkAuthorizedComment({t:jwt.token},userID,this.props.comment._id);//check xem user dang xem co phai la nguoi viet
        }
    }

    onClickEdit() {
        this.setState({ edit: !this.state.edit });
    };

    onCallBack(content1){
        const comment=this.state.comment;
        comment.content=content1;
        this.setState({ edit: !this.state.edit ,comment:comment});
    }

    onDeleteComment(){
        const postId= this.props.postId;
        const commentId=this.props.comment._id;
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        this.props.deleteComment(postId,userID,{t:jwt.token},commentId);
    }

    render() {
        return (
            <ul id="comments" >
                <li>
                    <div>
                        <h6>{this.state.comment.commentBy.name}</h6>
                        <p>
                            {
                                this.state.edit? <EditComment callBack={this.onCallBack.bind(this)} content={this.state.comment.content} commentId={this.state.comment._id}/>:
                                 <em>{this.state.comment.content}</em>
                            }
                        </p>
                        <div>
                            {this.state.comment.created}
                            {
                                // cho thằng viết ra có 2 chức năng này
                                this.props.isAuthorized &&[
                                <button onClick={this.onClickEdit.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Edit</button>,
                                <button onClick={this.onDeleteComment.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Delete</button>                               
                                ]  
                            }
                            {
                                <SubComment commentId={this.state.comment._id} listSubComment={this.state.comment.subComment}/>
                            }
                        </div>
                    </div>
                </li>
            </ul>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthorized:state.auth.isAuthorized
    }
}

export default connect(mapToStateProps,{deleteComment,checkAuthorizedComment})(ViewComment);
