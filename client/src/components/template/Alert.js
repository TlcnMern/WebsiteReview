import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Redirect}from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseAgree = () => {
        setRedirect(true);
        setOpen(false);
    };

    if(redirect){
        return <Redirect to={{
            pathname: '/Login',
            state: { from: '/DetailPost/5ddf4ae8b8dfe038d06ccb8a'}
          }}/>
    }
    return (
        <div>
            <div className="bg-white ">
                <button onClick={handleClickOpen} type="button " className="btnDangBai ">Viết bình luận</button>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Đăng nhập để trải nghiệm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    Chuyển hướng đăng nhập?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleCloseAgree} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}