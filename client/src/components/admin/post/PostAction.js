import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { hidenPost, allowPost } from '../../../action/adminAction';

class PostAction extends Component {
    // export default function (props) {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            allow: false,
            hiden: false
        }
    }

    handleClicksetHiden = () => {
        this.setState({
            hiden: true,
            open: true
        })
    };

    handleClickAllow = () => {
        this.setState({
            allow: true,
            open: true
        })
    };

    handleOk = () => {
        if (this.state.allow) {
            allowPost(this.props.postId)
            .then(data=>{
                this.props.callbaclReloadPage(this.props.state)
            })
        }
        if (this.state.hiden) {
            hidenPost(this.props.postId)
            .then(data=>{
                this.props.callbaclReloadPage(this.props.state)
            })
        }
        this.setState({
            open: false
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <div>
                {this.props.state ?
                    <Button onClick={this.handleClicksetHiden} variant="outlined" color="primary">
                        <i className="fa fa-trash" ></i>
                    </Button> :
                    <div>
                        <Button onClick={this.handleClickAllow} variant="outlined" color="primary">
                            <i className="fa fa-check" ></i>
                        </Button>
                        <Button onClick={this.handleClicksetHiden} variant="outlined" color="primary">
                            <i className="fa fa-trash" ></i>
                        </Button>
                    </div>
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Đọc kỹ chưa cậu ??"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Box này hiện ra để chắc cậu không phải lỡ tay bấm?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            đm quên
                        </Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus>
                            Kỷ rồi
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default PostAction