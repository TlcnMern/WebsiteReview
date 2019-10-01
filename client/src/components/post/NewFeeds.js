import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PostList from './PostList';
import {GetNewFeeds} from '../../action/postAction';
import {connect} from 'react-redux';

class NewFeeds extends Component{

    componentDidMount(){
        this.props.GetNewFeeds();
    }

    render(){
        return(
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <PostList posts={this.props.listPost}/>
                    <ul class="pager">
                        <li class="previous"><a href="#">&larr; Previous</a></li>
                        <li class="next"><a href="#">Next &rarr;</a></li>
                    </ul>
    
                </div>
                <div class="col-md-4">

                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProp(state){
    return{
        listPost: state.post.listPost
    }
}

export default connect(mapStateToProp,{GetNewFeeds})(NewFeeds);