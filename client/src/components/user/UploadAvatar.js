import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../public/stylesheets/partials/uploadAvatar.css'
import { auth } from '../../config/helper';
import { update } from '../../action/userAction';
import { connect } from 'react-redux';

class UploadAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open || false,
            img: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.onUploadAvatar = this.onUploadAvatar.bind(this);
        this.closeUpload = this.closeUpload.bind(this);
        this.userData = new FormData();
    }
    handleChange = () => event => {
        this.setState({
            img: event.target.files[0]
        })
    }

    closeUpload() {
        this.setState({
            open: false
        })
        this.props.callBackChangeStateOpen();
    }

    onUploadAvatar() {
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        this.userData.append("photo", this.state.img);
        this.props.update(userID, { t: jwt.token }, this.userData)
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
                    <DialogTitle>
                    <button className="closeButton" style={{float:'left'}} onClick={this.closeUpload}>Hủy</button>
                    <span>Cập nhật ảnh đại diện</span>
                    <button className="submitButton" style={{float:'right'}} onClick={this.onUploadAvatar} type="submit">Lưu<u></u></button>
                    </DialogTitle>
                    <DialogContent>
                        <input className="fileInput" name="photo" id="photoin" accept="image/*" type="file" onChange={this.handleChange('photo')} style={{ display: 'none' }}/>
                        <label htmlFor="photoin" className="btnChoosePhoto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span>Choose an image&hellip;</span></label>



                        <div className="imgPreview">
                            {this.state.img ?
                                <img aria-hidden src={URL.createObjectURL(this.state.img)} alt="Picture of me taking a photo of an image" /> :
                                <div></div>
                            }
                            

                        </div>
                        {/* <div className="displayImgPreview">
                            {this.state.img ?
                                <img id="displayImg" aria-hidden src={URL.createObjectURL(this.state.img)} alt="Picture of me taking a photo of an image" /> :
                                <div></div>
                            }
                        </div> */}
                            
                        
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    avatar: state.user.avatar
});
export default connect(mapStateToProps, { update })(UploadAvatar);