import React, {Component} from 'react';
import {getPhoto} from '../../action/postAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PostComment from "./ViewPostComment";
import Rating from './Rating';
import {auth} from '../../action/helper';
import {checkRatingAndShow} from '../../action/postAction';
import {getComment} from '../../action/postAction';


class ViewPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
          renderComment:false,
          renderRating:false
        };
    
        this.onClickComment=this.onClickComment.bind(this);
        this.onClickRating=this.onClickRating.bind(this);

      }
    state={
        img:'',
        isLoading:false,
        point:null
    }


    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount(){
        
        const postID = this.props.post._id;
        if(this.props.isAuthenticated){
            const jwt=auth.isAuthenticated();
            const userID=jwt.user._id;
            checkRatingAndShow(userID,{t:jwt.token},postID).then((data)=>{
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
        getComment(this.props.post._id)
        getPhoto(this.props.post._id).then(data=>{
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr =
                this.arrayBufferToBase64(data.data);
            this.setState({
                img: base64Flag + imageStr
            })
        })
     
        
    }
    onClickComment(){
        this.setState({renderComment:true});
        this.setState({renderRating:false});
      };
      onClickRating(){
        this.setState({renderRating:true});
        this.setState({renderComment:false});
      };
      renderCommentorRating(){
        
        if(this.state.renderRating)
          return (
            //   <div><PostComment postId={this.props.post._id}/></div>
            
            <div>
                {this.props.isAuthenticated &&
                (
                        <div>
                            <p>Bạn đánh giá bài viết như thế nào ?</p>
                            {
                                this.state.isLoading ? <Rating rating={this.state.point} idPost={this.props.post._id}/>:<p>dcm dang tai</p>
                            }
                        </div>
                )}
            </div>
            
          ) ;
          if(this.state.renderComment)
          return (<div>


              
                {this.props.isAuthenticated &&
                (
                        <div>
                            {
                                this.state.post ? <PostComment post={this.props.post} />:<p>dcm dang tai</p>
                            }
                        </div>
                        
                )}
                
               
          </div>
            
          ) ;
      }

    render(){
        return(
            <div className="row clsNEWFEED">
                <div className="col-sm-2">
                    <div className="imgDD">
                        <img id="imgSP" src={this.state.img} alt="imgDemo1" />
                        <Link to="SearchSP">Hotel Del Luna</Link>
                    </div>
                </div>
                <div className="col-sm-10 detail-NEWFEED">
                    <Link to={
                        {pathname: '/DetailPost',
                        state: { post: this.props.post  }}
                        }>
                        <span className="txt-NameBV">{this.props.post.title}</span>
                    </Link>
                    <br/>
                    <div className="text-muted">
                        
                        <Link to={
                            {pathname: '/GuestViewProfile',
                            state: { userID: this.props.post.postedBy._id  }}
                            }>
                            <span title={this.props.post.postedBy.name}> <img width="22px " height="22px " className="user_avatar_link " src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05" alt="Nguyễn Tuấn Vũ "/></span>
                            {this.props.post.postedBy.name}
                        </Link>
                        &nbsp;&nbsp;<span className="glyphicon glyphicon-time"></span>
                
                        {new Intl.DateTimeFormat('en-GB', { 
                                    month: '2-digit', 
                                    day: '2-digit',
                                    year: 'numeric', 
                                    }).format(new Date(this.props.post.created))}
                    </div>
                        <p>{this.props.post.contentSummary}</p>
                        <div className="rateBar">
                            <span className="rateBar-Like"><img src="https://img.icons8.com/ios/20/000000/like.png" alt="Like"/></span>
                            <span className="rateBar-Comment"  onClick={this.onClickComment}>
                                <img src="https://img.icons8.com/ios/20/000000/comments.png" alt="Comment"/>
                            </span>
                            <span className="rateBar-Rate" onClick={this.onClickRating}>
                                <img src="https://img.icons8.com/ios/20/000000/christmas-star.png" alt="Rate"/>
                            </span>
                            {this.renderCommentorRating()}
                        </div>
                    </div>
                </div>
        );
    }
}
function mapToStateProps(state){
    return{
        photo:state.post.photo,
        isAuthenticated:state.auth.isAuthenticated,
        pointRateOfUser:state.post.pointRateOfUser
    }
}

export default connect(mapToStateProps,{getComment,getPhoto})(ViewPost);