import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { addSubComment} from '../../action/postAction';
import { connect } from 'react-redux';
import man from '../../public/images/man.png';
import {Link} from 'react-router-dom';
class SubComment extends Component {


    state = {
        content: '',
        listSubComment: this.props.listSubComment || [],
        reply: false
    };

    onClickReply() {
        this.setState({ reply: !this.state.reply });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmitSubComment = e => {
        e.preventDefault();
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        addSubComment(userID, { t: jwt.token }, this.props.commentId, this.state.content)
            .then((data) => {
                if (data.err)
                    console.log(data.err)
                else {
                    console.log(data);
                    this.setState({listSubComment:data});
                }
            })
    };

    renderViewSubComment() {
        if (this.state.listSubComment.length > 0) {
            return (
                this.state.listSubComment.map((item, i) => {
                    return (
                        <div className="row clsSubcomment" key={i}>
                            <div className="col-sm-1">
                                <img className="anhdd" src={man} style={{maxWidth:'30px', height:'30px',marginRight:'5px'}} aria-hidden alt="Picture of me taking a photo of an image"/>
                            </div>
                            <div className="col-sm-11">
                                <div className="ContentComment">
                                <Link to={
                            {pathname: '/GuestViewProfile',
                            state: { userID: item.commentBy._id}}
                            }>{item.commentBy.name} </Link>
                                    <span>
                                        <em>{item.content}</em>
                                        
                                    </span>
                                </div>
                                <div >
                                    <span style={{fontSize:'10px', fontStyle: 'italic', color: '#c0c2c4'}}>{item.created}</span>
                                </div>
                                
                            </div>
                        </div>);
                }));
        }

    }

    renderCreateSubComment() {
        if (this.props.isAuthenticated)
            return (
                // <div>
                //     <form onSubmit={this.onSubmitSubComment}>
                //         <div className="col-md-12 form-group">
                //             <textarea className="form-control" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></textarea>
                //         </div>
                //         <div className="col-md-12 form-group text-right">
                //             <button type="submit" className="btn btn-primary" >Send</button>
                //         </div>
                //     </form>
                //     <hr />
                // </div>
                <div>
                   
                    <form onSubmit={this.onSubmitSubComment}>
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
    }

    render() {
        return (
            <div>
                <div style={{ marginLeft: '40px' }} >{this.renderViewSubComment()}</div>
                {this.props.isAuthenticated &&
                 <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Reply</button>
                }
                {
                    this.state.reply && this.renderCreateSubComment()
                }
                
            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps)(SubComment);
