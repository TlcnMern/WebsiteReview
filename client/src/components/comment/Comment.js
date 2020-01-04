import React, { Component } from 'react';
import { auth, API_URL } from '../../config/helper';
import { addComment } from '../../action/commentAction';
import { connect } from 'react-redux';
import ViewComment from './ViewComment';
import man from '../../public/images/man.png';
import Alert from '../template/Alert';

class Comment extends Component {
    state = {
        content: ''
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    onSubmitComment = e => {
        e.preventDefault();
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        this.props.addComment(userID, { t: jwt.token }, this.props.postId, this.state.content)
    }
    renderCreateComment() {
        const avatar = auth.getAvatar();
        var urlAvatar = '';
        if (avatar) {
            if (avatar.includes('dist')) {
                urlAvatar = API_URL + '/' + avatar;
            }
            else {
                urlAvatar = avatar;
            }
        }
        else {
            urlAvatar = man;
        }
        if (this.props.isAuthenticated) {
            return (
                <div>
                    <form onSubmit={this.onSubmitComment}>
                        <div className="col-md-12 form-group row addCmt">

                            <div className="col-md-1">
                                <img id="anhdd" src={urlAvatar} alt="imgUser" />
                            </div>
                            <div className="col-md-10">
                                <input className="form-control replycomment-input" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></input>
                            </div>
                            <div className="col-md-1">
                                <button type="submit" className="btnSubmitComt" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 171 171" style={{ fill: '#000000' }}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,171.99654v-171.99654h171.99654v171.99654z" fill="none"></path><g fill="#3498db"><path d="M10.01953,10.10303l20.12256,64.70947h130.1704zM30.1421,85.5l-20.12256,64.66772l150.29297,-64.66772z"></path></g></g></svg></button>
                            </div>
                        </div>
                    </form>
                    <hr />
                </div>
            );
        }
        else {
            return <Alert/>
        }

    };

    render() {
        return (
            <div>
                {this.renderCreateComment()}

                {
                    this.props.listComment.length > 0 ? this.props.listComment.map((item, i) => {
                        return (<ViewComment postId={this.props.postId} key={item._id} comment={item} />);
                    }) : <p>Không có comment nào cả</p>
                }


            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        listComment: state.post.listComment
    };
}

export default connect(mapToStateProps, { addComment })(Comment);