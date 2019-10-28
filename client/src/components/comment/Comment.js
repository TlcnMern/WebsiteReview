import React, {Component} from 'react';

import {auth} from '../../action/helper';
import {addComment} from '../../action/postAction';
import {connect} from 'react-redux';
import ViewComment from './ViewComment';

class Comment extends Component{


    state = {
        content: '',
        comments:[]
    };
    handleChange= name => event => {
        this.setState({[name]: event.target.value});
    }
    sortComment(comments){
        return comments.sort(function(a,b){
            return new Date(b.created)-new Date(a.created);
        });
    }
    onSubmitComment= e => {
        e.preventDefault();
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        console.log(this.props.postId);
        this.props.addComment(userID,{t:jwt.token},this.props.postId,this.state.content)
    }


    renderCreateComment(){
        if(this.props.isAuthenticated)
            return(
                <div>
                    {/* <h4>Leave a comment</h4> */}
                    <form onSubmit={this.onSubmitComment}>
                        <div className="col-md-12 form-group">
                            <label htmlFor="email">Comment</label>
                            <textarea className="form-control" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></textarea>
                        </div>
                        <div className="col-md-12 form-group text-right">
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>		
                    <hr />			
                </div>
                    
            );
    };
    
    renderCreateSubComment(){
        if(this.props.isAuthenticated)
            return(
                <div>
                    <form onSubmit={this.onSubmitComment}>
                        <div className="col-md-12 form-group">
                            <textarea className="form-control" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></textarea>
                        </div>
                        <div className="col-md-12 form-group text-right">
                            <button type="submit" className="btn btn-primary" >Send</button>
                        </div>
                    </form>		
                    <hr />			
                </div>
                    
            );
    }


    render(){
        return(
            <div>
                {this.renderCreateComment()}

                {
                    this.props.listComment.length>0? this.props.listComment.map((item, i) => {
                        return(<ViewComment postId={this.props.postId} key={i} comment={item}/>);
                    }): <p>Không có comment nào cả</p>
                }

               
            </div>
        );
    }
}

function mapToStateProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        listComment:state.post.listComment
    };
}

export default connect(mapToStateProps,{addComment}) (Comment);