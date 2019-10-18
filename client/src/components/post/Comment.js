import React, {Component} from 'react';

import {auth} from '../../action/helper';
import {addComment} from '../../action/postAction';
import {connect} from 'react-redux';
import SubComment from './SubComment';

class Comment extends Component{


    state = {
        content: '',
        comments:[]
    };
    componentWillMount(){
        var listComment =this.sortComment(this.props.post.comments);
        this.setState({comments:listComment})
    }
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
        
        addComment(userID,{
            t:jwt.token
        },this.props.post._id,this.state.content).then((data)=>{
            if(data.err)
                console.log(data.err)
            else{
                var listComment =this.sortComment(data);
                this.setState({comments:listComment});
            }
        })
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

    onClickReply(){
        this.setState({reply:!this.state.reply});
    }
    
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
                    this.state.comments.length>0? this.state.comments.map((item, i) => {
                        return(<SubComment postId={this.props.post._id} comment={item} key={i}/>);
                    }): <p>Không có comment nào cả</p>
                }

               
            </div>
        );
    }
}

function mapToStateProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps) (Comment);