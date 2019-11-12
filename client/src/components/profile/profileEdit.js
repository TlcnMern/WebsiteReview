import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../../public/stylesheets/partials/editProfie.css";
import TextField from '@material-ui/core/TextField';
import { update } from '../../action/userAction';
import { auth } from '../../action/helper';

class profileEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birthday: Date,
            gender: '',
            address: ''
        }
        this.onTodoChange = this.onTodoChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    componentDidMount() {
        this.userData = new FormData();
        this.setState({
            name: this.props.profile.name,
            birthday: this.props.profile.birthday,
            address: this.props.profile.address,
            gender: this.props.profile.gender
        })
    };
    onClickSave() {
        const jwt = auth.isAuthenticated();
        const userID = this.props.profile._id;
        update(userID, {
            t: jwt.token
        }, this.userData).then((data) => {
            if (data.err)
                console.log(data.err);
            else
                this.props.onChangeRenderEdit();
        });
    }

    onTodoChange = e => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
        this.userData.set(e.target.name, e.target.value);
        console.log(this.userData);
    };

    render() {
        return (
            <div className="row clsAbtMe">
                <ul className="ListAbtMe col-lg-3">
                    <li><span className="lstItem lstAbtMe-Actived ">Chỉnh sửa trang cá nhân</span></li>
                    <li><span className="lstItem  lstAbtMe">Đổi mật khẩu</span></li>
                </ul>
                <article className="ContentAbtMe col-lg-9">
                    {/* <div className="row rowName">
                    <div className="AvaCol">
                        <div className="AvaLine">
                            <button className="btnAva" title="Thay đổi ảnh đại diện">
                                            <img alt="Thay đổi ảnh đại diện" className="imgAva" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA"/>
                                        </button>

                        </div>
                    </div>
                    <div className="NameCol">
                        <h1 className="NameLine" title="nguyen_vux">nguyen_vux</h1>
                        <button className="btnName" type="button">Thay đổi ảnh đại diện</button>
                    </div>
                </div> */}
                    <div className="row rowProFile">
                        <aside className="txtProfileCol"><label htmlFor="pepName">Tên</label></aside>
                        <div className="inProfileCol"><input className="inFName" aria-required="true" name="name" id="pepName" type="text" value={this.state.name} onChange={this.onTodoChange} /></div>
                    </div>
                    <div className="row rowProFile">
                        <aside className="txtProfileCol"><label htmlFor="pepSex">Giới tính</label></aside>
                        <div className="inProfileCol"><input className="inFName" aria-required="true" name="gender" id="pepSex" type="text" value={this.state.gender} onChange={this.onTodoChange} /></div>
                    </div>
                    <div className="row rowProFile">
                        <aside className="txtProfileCol"><label htmlFor="pepBD">Ngày sinh</label></aside>
                        <TextField
                            label="Birthday"
                            type="date"
                            name="birthday"
                            placeholder="2017-05-24"
                            value={this.state.birthday}
                            onChange={this.onTodoChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/* <div className="inProfileCol"><input className="inFName" placeholder='10/01/1998' aria-required="true" name="birthday" id="pepBD" type="text" value={this.state.birthday}onChange={this.onTodoChange}/></div> */}
                    </div>
                    <div className="row rowProFile">
                        <aside className="txtProfileCol"><label htmlFor="pepAdd">Địa chỉ</label></aside>
                        <div className="inProfileCol"><input className="inFName" placeholder='Văn Hưởng, Quận 2, Hồ Chí Minh' aria-required="true" name="address" id="pepAdd" type="text"
                            value={this.state.address} onChange={this.onTodoChange} /></div>
                    </div>
                    <div className="row rowProFile ">
                        <aside className="txtProfileCol "><label></label></aside>
                        <button className="btnSaveProfile" disabled="" type="button" onClick={this.onClickSave}>Lưu</button>
                    </div>
                </article>
            </div>
        );
    }
}

function mapStateToProp(state) {
    return {
        profile: state.user.profile
    }
}

export default connect(mapStateToProp)(profileEdit);