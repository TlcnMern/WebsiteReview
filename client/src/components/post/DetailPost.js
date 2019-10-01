import React, {Component} from 'react';
import {getPhoto} from '../../action/postAction';
import {connect} from 'react-redux';
import Comment from './Comment';

class DetailPost extends Component{

    state={
        img:''
    }


    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount(){
        const { post } = this.props.location.state
        this.props.getPhoto(post._id);
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr =
            this.arrayBufferToBase64(post.photo);
        this.setState({
            img: base64Flag + imageStr
        })
    }

    render(){
        const { post } = this.props.location.state;
        return(
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <article>
                        <h4><a href="singlepost.html">{post.title}</a></h4>

                        <div class="row">
                            <div class="col-sm-6 col-md-6">
                                <span class="glyphicon glyphicon-folder-open"></span> &nbsp;<a href="#">Người đăng: {post.postedBy.name}		 </a>
                                &nbsp;&nbsp;<span class="glyphicon glyphicon-bookmark"></span> <a href="#">Chủ đề</a>: <a href="#">Fire</a>, <a href="#">Mars</a>
                            </div>
                            <div class="col-sm-6 col-md-6">
                                <span class="glyphicon glyphicon-pencil"></span> <a href="singlepost.html#comments">20 Comments</a>			          		
                                &nbsp;&nbsp;<span class="glyphicon glyphicon-time"></span> {post.created}		          		
                            </div>
                        </div>

                        <hr/>
                        <div class="row">
                            <div class="col-sm-6 col-md-6">
                                <img  src={this.state.img} style={{width:'700px',height:'300px'}} class="img-responsive"/>
                            </div>
                        </div>

                        <br />

                        <p class="lead">{post.content}</p>

                        <hr/>
                    </article>
                    <Comment post={post}/>  
                </div>
                <div class="col-md-4">

                </div>
            </div>
        </div>

            

        );
    }
}
function mapToStateProps(state){
    return{
        photo:state.post.photo
    }
}

export default connect(mapToStateProps,{getPhoto}) (DetailPost);