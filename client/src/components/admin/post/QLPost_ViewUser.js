import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import PostList from "./QLPost_VUPostList"

class ViewUser extends Component {
    render() {
        return (
            <div className="QLPost_ViewUserHeader">
                <div className="clsUserName">
                    <span>Tất cả bài viết của: <span>UserName</span></span>
                </div>
                <div className="clsUserPost">
                    <PostList/>
                </div>
            </div>
        );
    }
}



export default ViewUser;
