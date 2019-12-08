import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ViewDetail extends Component {
    constructor({ match }) {
        super();
        this.state = {
            nav1: null,
            nav2: null
        }
    }
   
    renderBoxDetailUser(){
        return(
            <div className="row clsQLUSer-Detail">
                <div className="clsAvatar-QLPost col-sm-3" >
                    <img id="anhdd-QLPost" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE"
                        alt="imgUser" width="150px" height="150px" />
                </div>
                <div className="row col-sm-8 clsAbtMe">
                    <article className="ContentAbtMe col-lg-12">
                        <div className="row rowProFile">
                            <aside className="txtProfileCol"><label htmlFor="pepName">Tên</label></aside>
                            <div className="inProfileCol">
                                <span className="getinFName" id="pepName">Nguyễn Tuấn Vũ</span>
                            </div>
                        </div>
                        <div className="row rowProFile">
                            <aside className="txtProfileCol"><label htmlFor="pepSex">Giới tính</label></aside>
                            <div className="inProfileCol">
            
                                <span className="getinFName" id="pepSex">
                                            Nam
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
                                    <div className="inProfileCol" >
                                        <span className="getinFName" id="pepAdd">
                                        Tây Ninh
                                        </span >
                                    </div>
                                </div>
                                <div className="row rowProFile ">
                                    <aside className="txtProfileCol "><label htmlFor="pepEmail ">Email</label></aside>
                                    <div className="inProfileCol ">
                                        <span className="getinFName" id="pepEmail" >
                                            nguyentuanvu231198@gmail.com
                                        </span >
                                    </div>
                                </div>
            
                    </article>
                </div>
                <div className="col-sm-1">
                </div>
            </div>
        );

    }
    render() {
        return (
            <div className="clsQLUser-ViewDetail">
                <div className="clsUserName">
                    <span>Thông tin người dùng</span>
                </div>
                <div className="clsUserPost">
                    {this.renderBoxDetailUser()}
                </div>
            </div>
        );
    }
}



export default ViewDetail;
