import React, { Component } from 'react';
import man from '../../public/images/man.png';
import { auth } from '../../action/helper';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem"
import Fade from "@material-ui/core/Fade";
import { connect } from 'react-redux';
import EditComment from './EditComment';
import { checkAuthorizedSubComment, checkAuthorizedComment, deleteSubComment } from '../../action/postAction';

class ViewSubComment extends Component {

    state = {
        SubComment: this.props.SubComment,
        isAuthorizedSubcomment: false,
        isAuthorized: false,
        anchorEl: null
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onCallBack(content1) {
        const SubComment = this.props.SubComment;
        SubComment.content = content1;
        this.setState({ edit: !this.state.edit, SubComment: SubComment });
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            checkAuthorizedSubComment({ t: jwt.token }, userID, this.props.commentId, this.state.SubComment._id)//check xem user dang xem co phai la nguoi viet
                .then(data => {
                    if (data) {
                        this.setState({
                            isAuthorizedSubcomment: true
                        })
                    }
                });
            checkAuthorizedComment({ t: jwt.token }, userID, this.props.commentId)//check xem user dang xem co phai la nguoi viet
                .then((data) => {
                    if (data) {
                        this.setState({
                            isAuthorized: true
                        })
                    }
                })
        }
    }

    onClickEdit() {
        this.setState({ edit: !this.state.edit });
        this.handleClose();
    };
    onDeleteSubComment() {
        const commentId = this.props.commentId
        const jwt = auth.isAuthenticated();
        const userId = jwt.user._id;
        deleteSubComment(commentId, userId, { t: jwt.token }, this.props.SubComment._id)
            .then(data => {
                if (data.error) {
                    console.log(data);
                }
                else {
                    this.props.callBackResetListSubComment(data);
                }
            });
    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        // console.log(this.state.SubComment.content + '  ' + this.state.isAuthorizedSubcomment)
        return (
            <div className="row clsSubcomment">
                <div className="col-sm-1">
                    <img className="anhdd" src={man} style={{ maxWidth: '30px', height: '30px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                </div>
                <div className="col-sm-11">
                    <div className="ContentComment">
                        <Link to={
                            {
                                pathname: '/GuestViewProfile',
                                state: { userID: this.state.SubComment.commentBy._id }
                            }
                        }>{this.state.SubComment.commentBy.name} </Link>

                        <span>
                            {this.state.edit ? <EditComment callBack={this.onCallBack.bind(this)} commentId={this.props.commentId}
                                content={this.state.SubComment.content} subCommentId={this.state.SubComment._id} /> :
                                <em>{this.state.SubComment.content}</em>
                            }
                        </span>

                        <span>
                            {/* <em>{this.state.SubComment.content}</em> */}
                            {
                                // Có tính năng delete có 2 TH==> - TH1: là người tạo ra subcomment (isAuthorizedSubcomment)
                                //                                - TH2: là người  viết ra comment chứa subcomment

                                // Có tính năng edit thì chỉ là thằng viết ra subcomment
                                (this.state.isAuthorized || this.state.isAuthorizedSubcomment) && [
                                    <Button aria-owns={open ? 'fade-menu' : undefined} key={0} aria-haspopup="true" onClick={this.handleClick}>
                                        <i className="fa fa-cogs" aria-hidden="true"></i>
                                    </Button>,
                                ]}

                            <Menu id="fade-menu" anchorEl={anchorEl} open={open} onClose={this.handleClose} TransitionComponent={Fade}>
                                {this.state.isAuthorizedSubcomment &&
                                    <MenuItem onClick={this.onClickEdit.bind(this)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                }
                                {
                                    (this.state.isAuthorized || this.state.isAuthorizedSubcomment) &&
                                    <MenuItem onClick={this.onDeleteSubComment.bind(this)} key={3}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem>
                                }
                            </Menu>
                        </span>

                    </div>
                    <div >
                        <span style={{ fontSize: '10px', fontStyle: 'italic', color: '#c0c2c4' }}>
                            {new Intl.DateTimeFormat('en-GB', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(this.state.SubComment.created))}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthorized: state.auth.isAuthorized
    }
}

export default connect(mapToStateProps)(ViewSubComment);