import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import ViewDetail from "./QLUser_ViewDetail"
import BoxSearch from "../../search/BoxSearch"
import { Link } from 'react-router-dom';

class QLUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            renderVD: false,
        };

        this.onClickViewDetail = this.onClickViewDetail.bind(this);
        this.onclickClose=this.onclickClose.bind(this);

    }

    onClickViewDetail() {
        this.setState({ renderVD: true });
    };
    onclickClose(){
        this.setState({renderVD:false});
    };
    renderViewDetailBox(){
        // Chỗ này xem chi tiết bài viết
        if(this.state.renderVD)
        return(
            <div className="boxDetail">
                <div className="clsboxDetail QLUser_Detail">
                    <div className="clsClose">
                        <button className="boxDetail-btnClose" onClick={this.onclickClose}>x</button>
                    </div>
                    <ViewDetail/>
                </div>
                
            </div>
        );
    }
    render() {
        return (
            <div className="row ToolQ boxContentAdmin">
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
                            <th className="col2">Full Name</th>
                            <th className="col3">Email</th>
                            <th className="col4">Gender</th>
                            <th className="col5">Total Post</th>
                            <th className="col6">Action</th>
                        </tr>
                     </thead>
                    <tbody>
                        <tr className="body table-row">
                            <td className="col1">1</td>
                            <td className="col2">
                                Nguyễn Tuấn Vũ        
                            </td>
                            <td className="col3">Nguyentuanvu231198@gmail.com</td>
                            <td className="col4">Nam</td>
                            <td className="col5">37</td>
                            <td className="col6">
                                <button onClick={this.onClickViewDetail}><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                   
                </table>
                {this.renderViewDetailBox()}
               
            </div>
        );
    }
}



export default QLUser;
