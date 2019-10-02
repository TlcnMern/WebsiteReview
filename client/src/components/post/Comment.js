import React, {Component} from 'react';

import {auth} from '../../action/helper';
import {addComment} from '../../action/postAction';
import {connect} from 'react-redux';

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
                var listComment =this.sortComment(data.comments);
                this.setState({comments:listComment});
            }
        })
    }


    renderCreateComment(){
        if(this.props.isAuthenticated)
            return(
                <div>
                    <h4>Leave a comment</h4>
                    <form onSubmit={this.onSubmitComment} role="form">
                        <div className="col-md-12 form-group">
                            <label for="email">Comment</label>
                            <textarea className="form-control" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></textarea>
                        </div>
                        <div className="col-md-12 form-group text-right">
                            <button type="submit" className="btn btn-primary" >Submit</button>
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

                { this.state.comments.map((item, i) => {
                    return(
                    
                    <ul id="comments" >
                        <li>
                            <div>
                                <h6>{item.postedBy.name}</h6>
                                <p>{item.created}</p>
                            </div>
                            <p>
                                <em>{item.content}</em>
                            </p>
                        </li>
                    </ul>);
                    })
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