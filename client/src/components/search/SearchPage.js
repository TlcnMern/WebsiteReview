import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import PostList from '../post/PostList';

class HomeFeed extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
        console.log(props.location);
    }

    render() {
        return (
            <div className="boxContent">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-home">
                                <hr />
                                {this.state.posts.length>0?
                                <div>
                                    <span  >Kết quả tìm kiếm</span>
                                    <PostList posts={this.state.postList} />
                                </div>:
                                <span className="title-list-index">Không tìm thấy kết quả</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default HomeFeed;