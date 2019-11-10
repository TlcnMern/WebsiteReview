import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetch} from '../../action/userAction';

class profileDetail extends Component{

    componentWillMount(){

        this.props.fetch(this.props.userID);
    }

    render() {
        return(
            <div className="row clsAbtMe">
            <article className="ContentAbtMe col-lg-12">
                <div className="row rowName">
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
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepName">Tên</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepName">{this.props.profile.name}</span>
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepSex">Giới tính</label></aside>
                    <div className="inProfileCol">
                        
                        <span className="getinFName" id="pepSex" >
                            {this.props.profile.gender}
                        </span >    
                        
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepBD">Ngày sinh</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepBD" >
                            23/11/1998
                        </span >   
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepAdd">Địa chỉ</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepAdd" >
                            Tây Ninh
                        </span >   
                    </div>
                </div>
                <div className="row rowProFile ">
                    <aside className="txtProfileCol "><label htmlFor="pepEmail ">Email</label></aside>
                    <div className="inProfileCol ">
                        <span className="getinFName" id="pepEmail" >
                            {this.props.profile.email}
                        </span >  
                    </div>
                </div>
                
            </article>
        </div>
        );
    }
}

function mapStateToProp(state){
    return{
        profile: state.user.profile
    }
}

export default connect(mapStateToProp,{fetch})(profileDetail);