import React, { Component } from 'react';
import ViewDetail from "./QLPost_ViewDetail"
import ViewUser from "./QLPost_ViewUser"
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import BoxSearch from "../../search/BoxSearch"
import { Link } from 'react-router-dom';
import {dispatchBodyAdmin} from '../../../action/userAction';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
class QLPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderVD: false,
            renderVU:false
        };

        this.onClickViewDetail = this.onClickViewDetail.bind(this);
        this.onClickViewUser=this.onClickViewUser.bind(this);
        this.onclickClose=this.onclickClose.bind(this);
        this.props.dispatchBodyAdmin();
    }

    onClickViewDetail() {
        this.setState({ renderVD: true });
    };
    onClickViewUser(){
        this.setState({renderVU:true});
    };
    onclickClose(){
        this.setState({renderVD:false});
        this.setState({renderVU:false})
    };

    renderViewDetailBox(){
        // Chỗ này xem chi tiết bài viết
        if(this.state.renderVD)
        return(
            <div className="boxDetail">
                <div className="clsboxDetail QLPost_Detail">
                    <div className="clsClose">
                        <button className="boxDetail-btnClose" onClick={this.onclickClose}>x</button>
                    </div>
                    <ViewDetail/>
                </div>
                
            </div>
        );
    }
    renderViewUserPostBox(){
        // Chỗ này xem tất cả bài viết của user
        if(this.state.renderVU)
        return(
            <div className="boxDetail">
                <div className="clsboxDetail QLPost_Detail">
                    <div className="clsClose">
                        <button className="boxDetail-btnClose" onClick={this.onclickClose}>x</button>
                    </div>
                    <ViewUser/>
                </div>
                
            </div>
        );
    }
    render() {
        return (
            <div className="boxContentAdmin">
                
                <div className="row ToolQL">
                <div className="titleQL col-sm-2">Quản lý bài viết</div>
                    <BoxSearch/>
                    <div className="PageQL col-sm-7">
                    <ul className="pagination">
                                <li>
                                    <Link to="">
                                        &laquo;
                                    </Link>
                                </li>
                                <li><Link to="">1</Link></li>
                                <li><Link to="">2</Link></li>
                                <li><Link to="">3</Link></li>
                                <li>
                                    <Link to="">
                                    &raquo;
                                    </Link>
                                </li>
                            </ul>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr className="table-header">
                            <th className="col1">Number</th>
                            <th className="col2">Image</th>
                            <th className="col3">Title</th>
                            <th className="col4">Product</th>
                            <th className="col5">Sumary</th>
                            <th className="col6">Content</th>
                            <th className="col7">Date</th>
                            <th className="col8">User</th>
                            <th className="col9">State</th>
                            <th className="col10">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="body table-row">
                            <td className="col1">1</td>
                            <td className="col2">
                                <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE" alt="imgUser" />
                            </td>
                            <td className="col3">Hà Giang-Trở về với thên nhiên</td>
                            <td className="col4">Hà Giang</td>
                            <td className="col5"><textarea defaultValue="This is a description."/></td>
                            <td className="col6"><textarea defaultValue="This is a description."/></td>
                            <td className="col7">21/11/2019</td>
                            <th className="col8" onClick={this.onClickViewUser}><Link to=" " >Nguyễn Tuấn Vũ</Link></th>
                            <th className="col9">Đã Duyệt</th>
                            <td className="col10">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr className="body table-row">
                            <td className="col1">2</td>
                            <td className="col2">
                                <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE" alt="imgUser" />
                            </td>
                            <td className="col3">Hà Giang-Trở về với thên nhiên</td>
                            <td className="col4">Hà Giang</td>
                            <td className="col5"><textarea defaultValue="This is a description."/></td>
                            <td className="col6"><textarea defaultValue="This is a description."/></td>
                            <td className="col7">21/11/2019</td>
                            <th className="col8" onClick={this.onClickViewUser}>Nguyễn Tuấn Vũ</th>
                            <th className="col9">Đã Duyệt</th>
                            <td className="col10">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr className="body table-row">
                            <td className="col1">3</td>
                            <td className="col2">
                                <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE" alt="imgUser" />
                            </td>
                            <td className="col3">Hà Giang-Trở về với thên nhiên</td>
                            <td className="col4">Hà Giang</td>
                            <td className="col5"><textarea defaultValue="This is a description."/></td>
                            <td className="col6"><textarea defaultValue="This is a description."/></td>
                            <td className="col7">21/11/2019</td>
                            <th className="col8" onClick={this.onClickViewUser}>Nguyễn Tuấn Vũ</th>
                            <th className="col9">Đã Duyệt</th>
                            <td className="col10">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr className="body table-row">
                            <td className="col1">4</td>
                            <td className="col2">
                                <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE" alt="imgUser" />
                            </td>
                            <td className="col3">Hà Giang-Trở về với thên nhiên</td>
                            <td className="col4">Hà Giang</td>
                            <td className="col5"><textarea defaultValue="This is a description."/></td>
                            <td className="col6"><textarea defaultValue="This is a description."/></td>
                            <td className="col7">21/11/2019</td>
                            <th className="col8" onClick={this.onClickViewUser}>Nguyễn Tuấn Vũ</th>
                            <th className="col9">Đã Duyệt</th>
                            <td className="col10">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                        <tr className="body table-row">
                            <td className="col1">5</td>
                            <td className="col2">
                                <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/s960x960/65817592_890571431296705_1761202617339346944_o.jpg?_nc_cat=102&_nc_oc=AQmgDkXBAsDKx1vnkIaSc2zlfIAFKZeiUqfLia4gOnHH690okum-gR_dJBbuvzpkHHA&_nc_ht=scontent.fsgn2-2.fna&oh=6de6a77d5d0c01700eec23efb1059182&oe=5E7ECAAE" alt="imgUser" />
                            </td>
                            <td className="col3">Hà Giang-Trở về với thên nhiên</td>
                            <td className="col4">Hà Giang</td>
                            <td className="col5"><textarea defaultValue="This is a description."/></td>
                            <td className="col6"><textarea defaultValue="This is a description."/></td>
                            <td className="col7">21/11/2019</td>
                            <th className="col8" onClick={this.onClickViewUser}>Nguyễn Tuấn Vũ</th>
                            <th className="col9">Đã Duyệt</th>
                            <td className="col10">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                <i className="fa fa-check" aria-hidden="true"></i>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </td>
                        </tr>
                    </tbody>     
                </table>
                {this.renderViewUserPostBox()}
                {this.renderViewDetailBox()}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
  });
  export default connect(mapStateToProps,{dispatchBodyAdmin})(QLPost);
