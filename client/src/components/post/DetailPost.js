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
        isLoading:false,
        point:null
    }
    componentDidMount(){
        const { post } = this.props.location.state;
        if(this.props.isAuthenticated){
            const jwt=auth.isAuthenticated();
            const userID=jwt.user._id;
            checkRatingAndShow(userID,{t:jwt.token},post._id).then((data)=>{
                if(data===null){
                    this.setState({
                        isLoading:true,
                        point:null
                    });
                }
                else{
                    if(data.error){
                        console.log(data.error);
                    }
                    else{
                        this.setState({
                            isLoading:true,
                            point:data
                        })
                    }
                }
            });
        }
        this.props.getComment(post._id)


    }
    render(){
        var  post ={};
        if(this.props.location.state.post){
             post  = this.props.location.state.post;
        }
        return(
            <div className="boxContent">
            <div className="CT-BaiViet">
                <div className="TitleBV">{post.title}</div>
                <div className="SPBV"><span>{post.productReview}</span></div>
                <div className="NDBV">
                    <div className="row GT-BaiViet">
                        <div className="col-sm-5 TLBV">
                            <span className="txtTomTat">Giới thiệu</span><br/>
                            <span>- Người đăng: 
                                <Link to={
                                    {pathname: '/GuestViewProfile',
                                    state: { userID: post.postedBy._id  }}}>
                                    {post.postedBy.name}
                                </Link>
                            </span><br/>
                            <span>- Sản phẩm review: {post.productReview}</span><br/>
                            <span>- Chủ đề: {post.theme}</span><br/>
                            <span>- Ngày đăng: 
                                {new Intl.DateTimeFormat('en-GB', { 
                                    month: '2-digit', 
                                    day: '2-digit',
                                    year: 'numeric', 
                                    }).format(new Date(post.created))}
                            </span><br/>
                            <span>- Link:<a href={post.link}>{post.link}</a></span><br/>
                            <span> <Rating rating={3} disabled={true} /></span>
                        </div>
                        <div className="col-sm-7 TomTat">
                            <span className="txtTomTat">Tóm tắt</span><br/>
                            <span>{post.contentSummary}</span>
                        </div>
                    </div> 
                    <div className="row MainBV ">
                        <div className="col-sm-9 ND-BaiViet">
                            <span className="txtND-BaiViet">Nội dung Review</span><br/>
                            <span>{post.content}</span>
                        </div>
                        <div className="col-sm-3 anh-BV"> 
                        <span className="txtND-BaiViet">Ảnh minh họa</span><br/>
                        <img src={this.props.location.state.img} width="150" height="260" alt="2R4U" style={{marginbottom:'10px'}}/>
                        <img src={this.props.location.state.img} width="150" height="260" alt="2R4U" style={{marginbottom:'10px'}}/>
                        <img src={this.props.location.state.img} width="150" height="260" alt="2R4U" style={{marginbottom:'10px'}}/>
                        <img src={this.props.location.state.img} width="150" height="260" alt="2R4U" style={{marginbottom:'10px'}}/>
                    </div>
                </div>
            </div>
            <div className="CommentBV">
                <Comment postId={post._id}/> 
            </div>
            {this.props.isAuthenticated &&
            (
                    <div>
                        <p>Bạn đánh giá bài viết như thế nào ?</p>
                        {
                            this.state.isLoading ? <Rating rating={this.state.point} idPost={post._id}/>:<p>dcm dang tai</p>
                        }
                    </div>
            )}
        </div>
        </div>
            
        );
    }
}
function mapToStateToProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated,
        pointRateOfUser:state.post.pointRateOfUser
    }
}


export default connect(mapToStateToProps,{getComment})(DetailPost) ;