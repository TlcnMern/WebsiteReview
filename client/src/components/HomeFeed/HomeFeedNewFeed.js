import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import AddReplyComment from './HNFAddRepLyCmt';
import Rating from './HNFRating';
import LoadComment from '../comment/Comment';
import PostList from '../post/PostList';
import {GetNewFeeds} from '../../action/postAction';
class HomeFeedNewFeed extends Component{
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
        postList:[]
    }
    componentDidMount(){
        GetNewFeeds().then((data)=>{
            if(data.error)
                console.log(data.error);
            else{
                if(data.length>0)
                    this.setState({postList:data})
            }
        });
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
        if(this.state.renderComment)
          return (
              <div><AddReplyComment/>
              <LoadComment/></div>
            
          ) ;
          if(this.state.renderRating)
          return (
            <Rating/>
          ) ;
      }

    render() {
        return(
                <PostList posts={this.state.postList}/>
                
        );
        
    }
}



export default HomeFeedNewFeed;