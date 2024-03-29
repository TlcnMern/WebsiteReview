import React, { Component } from 'react';
import { auth, API_URL } from '../../config/helper';
import { deleteComment, checkAuthorizedComment } from '../../action/commentAction';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import SubComment from './SubComment';
import man from '../../public/images/man.png';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Like from '../common/Like';

class ViewComment extends Component {
    state = {
        content: '',
        anchor: false,
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

    handleClose = () => (e) => {
        this.setState({
            anchor: null
        });

    };

    handleToggle = event => {
        this.setState({ anchor: event.currentTarget });
    };

    shouldComponentUpdate(nextProp, nextState) {
        return (this.state !== nextState)
    }

    onClickEdit() {
        this.setState({
            edit: !this.state.edit,
            anchor: null
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
        this.setState({
            anchor: null
        });
    }

    renderReply() {
        if (this.state.reply)
            return (
                <div>
                    {<SubComment commentId={this.props.comment._id} listSubComment={this.state.listSubComment} />}
                </div>);
    }

    render() {
        const avatar = this.props.comment.commentBy.avatar;
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


        const { anchor } = this.state;
        const open = Boolean(anchor);
        return (
            <div style={{ marginLeft: '20px', padding: '10px' }}>
                <div className="row">
                    <div className="col-sm-1">
                        <img className="anhdd" src={urlAvatar} style={{ width: '40px', borderRadius: '50%', height: '40px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                    </div>
                    <div className="row col-sm-11">
                        <div className="ContentComment">

                            <Link style={{ fontWeight: 'bold' }} to={
                                {
                                    pathname: `/GuestViewProfile/${this.props.comment.commentBy._id}`
                                }}>
                                {this.props.comment.commentBy.name}

                            </Link>

                            <span >
                                {this.state.edit ? <EditComment callBack={this.onCallBack.bind(this)} content={this.props.comment.content} commentId={this.props.comment._id} /> :
                                    <em style={{ fontStyle: 'normal', fontSize: '14px' }}>{this.props.comment.content}</em>
                                }
                            </span>

                        </div >
                        {
                            // cho thằng viết ra có 2 chức năng này
                            this.state.isAuthorized && (
                                <div >
                                    <Button
                                        ref={anchor}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleToggle}
                                    >
                                        <i style={{ marginLeft: '5px' }} className="fa fa-caret-down" aria-hidden="true"></i>
                                    </Button>
                                    <Popper style={{ zIndex: '100' }} open={open} anchorEl={anchor} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={this.handleClose()}>
                                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                                            <MenuItem onClick={this.onClickEdit.bind(this)} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                                            <MenuItem onClick={this.onDeleteComment.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            )}
                    </div>
                </div>
                <div className="clsToolCmt">
                    {this.props.isAuthenticated && <Like commentId={this.props.comment._id} totalLike={this.props.comment.totalLike} />
                    }
                    {this.props.isAuthenticated &&
                        <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{ marginLeft: '10px', fontSize: '11px', fontStyle: 'Italic' }}>
                            Trả lời</button>
                    }
                    <span style={{ fontSize: '10px', fontStyle: 'italic', color: 'rgb(192, 194, 196)', marginLeft: '10px' }}>
                        {auth.formatDate(new Date(this.props.comment.created))}
                    </span>
                    
                </div>
                {this.renderReply()}
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
