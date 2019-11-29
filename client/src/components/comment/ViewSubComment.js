import React, { Component } from 'react';
import man from '../../public/images/man.png';
import { auth,API_URL } from '../../config/helper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditComment from './EditComment';
import { checkAuthorizedSubComment, checkAuthorizedComment, deleteSubComment } from '../../action/commentAction';


import MenuItem from "@material-ui/core/MenuItem"
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ViewSubComment extends Component {

    state = {
        SubComment: this.props.SubComment,
        isAuthorizedSubcomment: false,
        isAuthorized: false
    }

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
        // this.handleClose();
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
        // const { anchorEl } = this.state;
        // const open = Boolean(anchorEl);
        const avatar = this.state.SubComment.commentBy.avatar;
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


        return (
            <div className="row clsSubcomment">
                <div className="col-sm-1">
                    <img className="anhdd" src={urlAvatar} style={{ width: '40px',marginRight:'5px',borderRadius:'50%', height: '40px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                </div>
                <div className="row col-sm-11">
                    <div className="row ContentComment" style={{maxWidth:'500px'}}>
                        <span>
                            <Link to={
                                {
                                    pathname: `/GuestViewProfile/${this.state.SubComment.commentBy._id}`
                                }}>
                                {this.state.SubComment.commentBy.name}
                            </Link>
                        </span>
                        <span>
                            {this.state.edit ? <EditComment callBack={this.onCallBack.bind(this)} commentId={this.props.commentId}
                                content={this.state.SubComment.content} subCommentId={this.state.SubComment._id} /> :
                                <span>{this.state.SubComment.content}</span>
                            }
                        </span>

                    </div>
                    <div style={{color:'#dbdbdb'}}>
                            {/* <em>{this.state.SubComment.content}</em> */}
                    {
                                // Có tính năng delete có 2 TH==> - TH1: là người tạo ra subcomment (isAuthorizedSubcomment)
                                //                                - TH2: là người  viết ra comment chứa subcomment

                                // Có tính năng edit thì chỉ là thằng viết ra subcomment
                                (this.state.isAuthorized || this.state.isAuthorizedSubcomment) &&
                                // <Button aria-owns={open ? 'fade-menu' : undefined} key={0} aria-haspopup="true" onClick={this.handleClick}>
                                //     <i className="fa fa-cogs" aria-hidden="true"></i>
                                // </Button>,
                                <MuiThemeProvider className="dropdownMenu">
                                    <DropDownMenu style={{overflow:'visible'}}>
                                        {/* <MenuItem onClick={this.onClickEdit.bind(this)} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                        <MenuItem onClick={this.onDeleteComment.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem> */}
                                        {this.state.isAuthorizedSubcomment &&
                                            <MenuItem onClick={this.onClickEdit.bind(this)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                        }
                                        {
                                            (this.state.isAuthorized || this.state.isAuthorizedSubcomment) &&
                                            <MenuItem onClick={this.onDeleteSubComment.bind(this)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem>
                                        }
                                    </DropDownMenu>
                                </MuiThemeProvider>
                            }
                    </div>
                    
                <div >
               
                        
            </div>
            
        </div>
        <span style={{ fontSize: '10px', fontStyle: 'italic',marginLeft:'60px', color: '#c0c2c4' }}>
                            {new Intl.DateTimeFormat('en-GB', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(this.state.SubComment.created))}
                </span>
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
