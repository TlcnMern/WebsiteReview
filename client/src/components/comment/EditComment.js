import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComment, updateSubComment } from '../../action/postAction';
import { auth } from '../../action/helper';

class EditComment extends Component {
    state = {
        content: this.props.content || ''
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onClickSave() {
        if (this.props.subCommentId) {
            const subCommentId = this.props.subCommentId;
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            updateSubComment(subCommentId, userID, { t: jwt.token }, this.state.content).then((data) => {
                if (data.error) {
                    console.log(data);
                } else {
                    this.props.callBack(this.state.content);
                }
            });
        } else {
            const commentId = this.props.commentId;
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            updateComment(commentId, userID, { t: jwt.token }, this.state.content).then((err, data) => {
                if (err)
                    console.log(err);
                else {
                    this.props.callBack(this.state.content);
                }
            });
        }

    }
    render() {
        return [<input className="editiCmt" key={1} value={this.state.content} name='content'
            onChange={this.handleChange.bind(this)} > </input>,
        <button className="editbCmt" key={2} onClick={this.onClickSave.bind(this)} > save </button>
        ];
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthorized: state.auth.isAuthorized
    }
}

export default connect(mapToStateProps)(EditComment);