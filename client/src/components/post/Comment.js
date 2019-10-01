import React, {Component} from 'react';

import {auth} from '../../action/helper';
import {addComment} from '../../action/postAction';

class Comment extends Component{
    state = {
        content: '',
        comments:[]
    };
    componentWillMount(){
        this.setState({comments:this.props.post.comments})
    }
    handleChange= name => event => {
        this.setState({[name]: event.target.value});
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
                this.setState({comments:data.comments});
            }
        })
    }

    render(){
        const jwt=auth.isAuthenticated();
        const user=jwt.user;
        return(
            <div>
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
                </div>
                <hr />
                { this.state.comments.map((item, i) => {
                    return(
                    // >
                    <ul id="comments" >
                        <li>
                            <div>
                                <h6>{user.name}</h6>
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
export default Comment;