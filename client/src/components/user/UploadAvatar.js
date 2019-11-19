import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../public/stylesheets/partials/uploadAvatar.css'
import {auth} from '../../config/helper';
import {update} from '../../action/userAction';

class UploadAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open || false,
            img: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.onUploadAvatar=this.onUploadAvatar.bind(this);
        this.closeUpload=this.closeUpload.bind(this);
        this.userData = new FormData();
    }
    handleChange =()=>event => {
        this.setState({
            img: event.target.files[0]
        })
    }

    closeUpload (){
        this.setState({
            open:false
        })
        this.props.callBackChangeStateOpen();
    }

    onUploadAvatar(){
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        this.userData.append("photo", this.state.img);
        update(userID,{t:jwt.token},this.userData)
        .then((data) => {
            if (data.err)
                console.log(data.err);
            else
                this.props.callBackChangeStateOpen();
        });
    }

    
    render() {
        return (
            <div className="UploadAvatar">
                <Dialog open={this.state.open}>
                    <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
                    <DialogContent>
                        <form>
                            <input className="fileInput" name="photo" accept="image/*"
                                type="file"
                                onChange={this.handleChange('photo')} />
                            <button className="submitButton" onClick={this.onUploadAvatar} type="submit">Cập nhật</button>
                        </form>
                        <div className="imgPreview">
                            {this.state.img ?
                                <img aria-hidden
                                    src={URL.createObjectURL(this.state.img)} alt="Picture of me taking a photo of an image" /> :
                                <div></div>
                            }
                        </div>
                        <Button onClick={this.closeUpload} variant="contained" color="secondary" >HUỶ</Button>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default UploadAvatar