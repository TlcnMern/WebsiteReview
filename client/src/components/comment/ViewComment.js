import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { deleteComment } from '../../action/postAction';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import SubComment from './SubComment';
import { checkAuthorizedComment } from '../../action/postAction';
import man from '../../public/images/man.png';
import { Link } from 'react-router-dom';
import MenuItem from "@material-ui/core/MenuItem"
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ViewComment extends Component {
    state = {
        content: '',
        isAuthorized: false,
        listSubComment: this.props.comment.subComment || [],
        edit: false,
        reply: false
    };
    componentDidMount() {
        if (this.props.isAuthenticated) {
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            checkAuthorizedComment({ t: jwt.token }, userID, this.props.comment._id)//check xem user dang xem co phai la nguoi viet
                .then((data) => {
                    if (data) {
                        this.setState({
                            isAuthorized: true
                        })
                    }
                })
        }
    }


    shouldComponentUpdate(nextProp, nextState) {
        return (this.state !== nextState)
    }

    onClickEdit() {
        this.setState({
            edit: !this.state.edit
        });
    };

    onClickReply() {
        this.setState({ reply: !this.state.reply });
    };

    onCallBack(content1) {
        const comment = this.props.comment;
        comment.content = content1;
        this.setState({ edit: !this.state.edit, comment: comment });
    }

    onDeleteComment() {
        const postId = this.props.postId;
        const commentId = this.props.comment._id;
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        this.props.deleteComment(postId, userID, { t: jwt.token }, commentId);
    }

    renderReply() {
        if (this.state.reply)
            return (
                <div>
                    {<SubComment commentId={this.props.comment._id} listSubComment={this.state.listSubComment} />}
                </div>);
    }

    render() {
        return (
            <div style={{ marginLeft: '20px', padding: '10px' }}>

                <div className="row">
                    <div className="col-sm-1">
                        <img className="anhdd" src={man} style={{ maxWidth: '30px', height: '30px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                    </div>
                    <div className="row col-sm-11">
                        <div className="ContentComment">

                            <Link to={
                                {
                                    pathname: `/GuestViewProfile/${this.props.comment.commentBy._id}`
                                }}>
                                {this.props.comment.commentBy.name}

                            </Link>

                            <span>
                                {this.state.edit ? <EditComment callBack={this.onCallBack.bind(this)} content={this.props.comment.content} commentId={this.props.comment._id} /> :
                                    <em>{this.props.comment.content}</em>
                                }
                            </span>

                        </div>
                        {
                            // cho thằng viết ra có 2 chức năng này
                            this.state.isAuthorized && (
                                <div>
                                    <MuiThemeProvider>
                                        <DropDownMenu>
                                            <MenuItem onClick={this.onClickEdit.bind(this)} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                            <MenuItem onClick={this.onDeleteComment.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem>
                                        </DropDownMenu>
                                    </MuiThemeProvider>
                                </div>

                            )}
                    </div>

                </div>

                <div>
                    <span style={{ fontSize: '10px', fontStyle: 'italic', color: 'rgb(192, 194, 196)', marginLeft: '50px' }}>
                        {new Intl.DateTimeFormat('en-GB', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        }).format(new Date(this.props.comment.created))}
                    </span>
                    {this.props.isAuthenticated &&
                        <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Reply</button>
                    }
                    {this.renderReply()}
                </div>




            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps, { deleteComment })(ViewComment);
