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
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount(){
        getPhoto(this.props.post._id).then(data=>{
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr =
                this.arrayBufferToBase64(data.data.data);
            this.setState({
                img: base64Flag + imageStr
            })
        })
        
    }

    render(){
        console.log('render viewpost');
        return(
            <article>
                <h4>
                    <Link to={
                        {pathname: '/DetailPost',
                        state: { post: this.props.post, img:this.state.img  }}
                        }>
                        {this.props.post.title}
                    </Link>
                </h4>

                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        Người đăng: 
                        <Link to={
                            {pathname: '/GuestViewProfile',
                            state: { userID: this.props.post.postedBy._id  }}
                            }>
                            
                            {this.props.post.postedBy.name}
                        </Link>
                        
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <span className="glyphicon glyphicon-pencil"></span> 
                        {/* <a href="singlepost.html#comments">20 Comments</a>			          		 */}
                        &nbsp;&nbsp;<span className="glyphicon glyphicon-time"></span>
                        {
                            new Date(this.props.post.created).toString()
                        }    		
                        
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <img  src={this.state.img} aria-hidden alt="Picture of me taking a photo of an image" style={{width:'700px',height:'300px'}} className="img-responsive"/>
                    </div>
                </div>

                <br />

                <p className="lead">{this.props.post.contentSummary}</p>

                <p className="text-right">
                    <Link to={
                        {pathname: '/DetailPost',
                        state: { post: this.props.post  }}
                        }>
                        continue reading...
                    </Link>
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