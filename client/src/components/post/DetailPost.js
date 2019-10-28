import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Comment from '../comment/Comment';
import Rating from './Rating';
import {auth} from '../../action/helper';
import {checkRatingAndShow} from '../../action/postAction';
import {connect} from 'react-redux';
import {getComment} from '../../action/postAction';

class DetailPost extends Component{

    state={
        img:'',
        pointRating:null
    }
    constructor(){
        super();
        this.changeCheckRating=this.changeCheckRating.bind(this);
    }
    componentWillMount(){
        const { post } = this.props.location.state;
        this.props.getComment(post._id)
        if(this.props.isAuthenticated){
            this.checkRating(post._id);
        }
    }
    checkRating=(postId)=>{
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        
        checkRatingAndShow(userID,{
            t:jwt.token
        },postId).then((data)=>{
            if(data.error){
                console.log(data);
                return;
            }
            else{
                if(data.length===0){//nếu chưa đánh giá
                    return;
                }
                this.setState({pointRating:data[0].point});
                return data[0].point;
            }
        })
    }

    changeCheckRating(rating){
        console.log(rating);
        this.setState({pointRating:rating});
    }

    render(){
        var  post ={};
        if(this.props.location.state.post){
             post  = this.props.location.state.post;
        }
        return(
           
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <article>
                        <h4><span>{post.title}</span></h4>

                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                            Người đăng: 
                                <Link to={
                                    {pathname: '/GuestViewProfile',
                                    state: { userID: post.postedBy._id  }}
                                    }>
                                    
                                    {post.postedBy.name}
                                </Link>
                                <br/> <span>Sản phẩm review: {post.productReview}</span>
                                <br/> <span>Chủ đề: {post.theme}</span>

                            </div>
                            <div className="col-sm-6 col-md-6">
                                <span className="glyphicon glyphicon-pencil"></span> <a href="singlepost.html#comments">20 Comments</a>			          		
                                &nbsp;&nbsp;<span className="glyphicon glyphicon-time"></span> {post.created}		          		
                            </div>
                        </div>

                        <hr/>
                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <img src={this.props.location.state.img} style={{width:'700px',height:'300px'}} aria-hidden alt="Picture of me taking a photo of an image" className="img-responsive"/>
                            </div>
                        </div>

                        <br />

                        <p className="lead">{post.content}</p><br/>
                        <a href={post.link}>{post.link}</a>

                        <hr/>
                    </article>
                    <Comment postId={post._id}/>  
                </div>
                <div className="col-md-4">
                <p>Điểm đánh giá bài viết</p>
                    <Rating rating={3} disabled={true} />
                {this.props.isAuthenticated &&
                    (
                        <div>
                            <p>Bạn đánh giá bài viết như thế nào ?</p>
                            <Rating changeCheckRating={this.changeCheckRating} check={this.state.pointRating} rating={this.state.pointRating}  idPost={post._id}/>
                        </div>
                    )
                }
                    

                </div>

            </div>
        </div>

            

        );
    }
}
function mapToStateToProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}


export default connect(mapToStateToProps,{getComment})(DetailPost) ;