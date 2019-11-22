import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import PostList from '../post/PostList';
import {searchPost} from '../../action/postAction';
import qs from  'qs';
import Loading from '../template/Loading';

class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            isLoading:true
        }
        // console.log(props.location.search);
        var query= qs.parse(props.location.search, { ignoreQueryPrefix: true });
        searchPost(query).then(data=>{
            if(data.error){
                return;
            }
            else{
                this.setState({
                    posts:data,
                    isLoading:false
                })
            }
        });
    }

    render() {
        return (
            <div className="boxContent">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-home">
                                <span  >Kết quả tìm kiếm</span>
                                <hr />

                                {this.state.isLoading? <Loading/>: (this.state.posts.length>0?
                                <div>
                                    <PostList posts={this.state.posts} />
                                </div>:
                                <span className="title-list-index">Không tìm thấy kết quả</span>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default SearchPage;