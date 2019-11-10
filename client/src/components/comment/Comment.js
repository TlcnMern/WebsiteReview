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
    onSubmitComment= e => {
        e.preventDefault();
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        this.props.addComment(userID,{t:jwt.token},this.props.postId,this.state.content)
    }


    renderCreateComment(){
        if(this.props.isAuthenticated)
            return(
                <div>
           
                    <form onSubmit={this.onSubmitComment}>
                        <div className="col-md-12 form-group row addCmt">
                        
                            <div className="col-md-1">
                            <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA" alt="imgUser" />
                            </div>
                            <div className="col-md-10">
                                <input className="form-control replycomment-input" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></input>
                            </div>
                            <div className="col-md-1">
                                <button type="submit" className="btnSubmitComt" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 171 171" style={{fill:'#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,171.99654v-171.99654h171.99654v171.99654z" fill="none"></path><g fill="#3498db"><path d="M10.01953,10.10303l20.12256,64.70947h130.1704zM30.1421,85.5l-20.12256,64.66772l150.29297,-64.66772z"></path></g></g></svg></button>
                            </div>
                            
                            
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