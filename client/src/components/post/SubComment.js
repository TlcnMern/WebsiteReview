import React, {Component} from 'react';

import {auth} from '../../action/helper';
import {addSubComment} from '../../action/postAction';
import {connect} from 'react-redux';

class SubComment extends Component{


    state = {
        content:'',
        reply:false
    };
   
    onClickReply(){
        this.setState({reply:!this.state.reply});
    };

    handleChange= name => event => {
        this.setState({[name]: event.target.value});
    };

    onSubmitSubComment= e => {
        e.preventDefault();
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        

        console.log(this.state.content);
        addSubComment(userID, {t:jwt.token}, this.props.comment._id, this.props.postId,this.state.content)
        .then((data)=>{
            if(data.err)
                console.log(data.err)
            else{
                console.log('ok');
            }
        })
    };
    
    renderCreateSubComment(){
        if(this.props.isAuthenticated)
            return(
                <div>
                    <form onSubmit={this.onSubmitSubComment}>
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
                <ul id="comments" >
                    <li>
                        
                        <div>
                            <h6>{this.props.comment.postedBy.name}</h6>
                            <p>
                                <em>{this.props.comment.content}</em>
                            </p>
                            <p>
                            {this.props.comment.created} 
                            <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{marginLeft:'10px'}}>Reply</button>
                            </p> 
                        </div>
                        
                    </li>
                    
                    { 
                        this.state.reply && this.renderCreateSubComment()
                    }
                </ul>
        );
    }
}

function mapToStateProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps) (SubComment);
