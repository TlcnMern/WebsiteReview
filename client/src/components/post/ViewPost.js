import React, {Component} from 'react';
import {getPhoto} from '../../action/postAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class ViewPost extends Component{

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
        // this.props.getPhoto(this.props.post._id);
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr =
            this.arrayBufferToBase64(this.props.post.photo);
        this.setState({
            img: base64Flag + imageStr
        })
    }

    render(){
        return(
            <article>
                <h4>
                    <Link to={
                        {pathname: '/DetailPost',
                        state: { post: this.props.post  }}
                        }>
                        {this.props.post.title}
                    </Link>
                </h4>

                <div class="row">
                    <div class="col-sm-6 col-md-6">
                        <span class="glyphicon glyphicon-folder-open"></span> &nbsp;
                        <Link to={
                            {pathname: '/Profile',
                            state: { userID: this.props.post.postedBy._id  }}
                            }>
                            Người đăng:
                            {this.props.post.postedBy.name}
                        </Link>
                        &nbsp;&nbsp;<span class="glyphicon glyphicon-bookmark"></span> <a href="#">Chủ đề</a>: <a href="#">Fire</a>, <a href="#">Mars</a>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <span class="glyphicon glyphicon-pencil"></span> <a href="singlepost.html#comments">20 Comments</a>			          		
                        &nbsp;&nbsp;<span class="glyphicon glyphicon-time"></span> {this.props.post.created}		          		
                    </div>
                </div>

                <hr/>
                <div class="row">
                    <div class="col-sm-6 col-md-6">
                        <img  src={this.state.img} style={{width:'700px',height:'300px'}} class="img-responsive"/>
                    </div>
                </div>

                <br />

                <p class="lead">{this.props.post.contentSummary}</p>

                <p class="text-right">
                    <a href="singlepost.html">
                        continue reading...
                    </a>
                </p>

                <hr/>
            </article>

        );
    }
}
function mapToStateProps(state){
    return{
        photo:state.post.photo
    }
}

export default connect(mapToStateProps,{getPhoto})(ViewPost);