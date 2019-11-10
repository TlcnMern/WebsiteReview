import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { deleteComment } from '../../action/postAction';
import { connect } from 'react-redux';
import EditComment from  './EditComment';
import SubComment from  './SubComment';
import {checkAuthorizedComment} from '../../action/postAction';
import man from '../../public/images/man.png';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem"
import Fade from "@material-ui/core/Fade";

class ViewComment extends Component {


    state = {
        comment:this.props.comment||{},
        content: '',
        listSubComment: this.props.comment.subComment || [],
        edit:false,
        anchorEl: null
    };
    // sortComment(comments){
    //     return comments.sort(function(a,b){
    //         return new Date(b.created)-new Date(a.created);
    //     });
    // }
    componentDidMount(){
        if(this.props.isAuthenticated){
            const jwt=auth.isAuthenticated();
            const userID=jwt.user._id;
            this.props.checkAuthorizedComment({t:jwt.token},userID,this.props.comment._id);//check xem user dang xem co phai la nguoi viet
        }
    }

    onClickEdit() {
        this.setState({ edit: !this.state.edit });
        this.handleClose();
    };

    onCallBack(content1){
        const comment=this.state.comment;
        comment.content=content1;
        this.setState({ edit: !this.state.edit ,comment:comment});
    }

    onDeleteComment(){
        const postId= this.props.postId;
        const commentId=this.props.comment._id;
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        this.props.deleteComment(postId,userID,{t:jwt.token},commentId);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };


    
    
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div style={{marginLeft:'20px'}}>
                
                <div className="row">
                    <div className="col-sm-1">
                        <img className="anhdd" src={man} style={{maxWidth:'30px', height:'30px',marginRight:'5px'}} aria-hidden alt="Picture of me taking a photo of an image"/>
                    </div>
                    <div className="row col-sm-11">
                        <div className="ContentComment">
                        <Link to={
                            {pathname: '/GuestViewProfile',
                            state: { userID: this.state.comment.commentBy._id }}
                            }>
                                {this.state.comment.commentBy.name} </Link>
                            <span>
                            {this.state.edit? <EditComment callBack={this.onCallBack.bind(this)} content={this.state.comment.content} commentId={this.state.comment._id}/>:
                            <em>{this.state.comment.content}</em>
                            }
                            </span>
                            
                        </div>
                    
                        <div className="btnOption">

                        {
                        // cho thằng viết ra có 2 chức năng này
                        this.props.isAuthorized &&[

                            <Button aria-owns={open ? 'fade-menu' : undefined} key={0} aria-haspopup="true" onClick={this.handleClick}>
                                <i className="fa fa-cogs" aria-hidden="true"></i>
                            </Button>,
                            <Menu id="fade-menu" anchorEl={anchorEl} open={open} key={1} onClose={this.handleClose} TransitionComponent={Fade}>
                                <MenuItem onClick={this.onClickEdit.bind(this)} key={2}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</MenuItem>
                                <MenuItem onClick={this.onDeleteComment.bind(this)} key={3}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</MenuItem>
                            </Menu>
                            
                                                 
                        ]  }

                            
                        </div>
                    </div>
                    
                </div>
                
                <div>
                    <span style={{fontSize: '10px', fontStyle: 'italic', color: 'rgb(192, 194, 196)'}}>{this.state.comment.created}</span>
                    {/* {
                        // cho thằng viết ra có 2 chức năng này
                        this.props.isAuthorized &&[
                        <button onClick={this.onClickEdit.bind(this)} key={1} className="btn btn-link" style={{ marginLeft: '10px' }}>Edit</button>,
                        <button onClick={this.onDeleteComment.bind(this)} key={2} className="btn btn-link" style={{ marginLeft: '10px' }}>Delete</button>                               
                        ]  
                    } */}
                    {
                        <SubComment commentId={this.state.comment._id} listSubComment={this.state.comment.subComment}/>
                    }
                </div>


                    

            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthorized:state.auth.isAuthorized
    }
}

export default connect(mapToStateProps,{deleteComment,checkAuthorizedComment})(ViewComment);
