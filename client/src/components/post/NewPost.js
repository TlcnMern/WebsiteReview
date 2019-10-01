import React,{Component} from 'react';
import '../../public/stylesheets/partials/post.css';
import {auth} from '../../action/helper';
import "bootstrap/dist/css/bootstrap.min.css";
import {newPost} from '../../action/postAction';

class NewPost extends Component{
    state={
        user:{},
        render:false
    }
    handleChange= name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value;
        this.postData.set(name, value);
    }

    componentDidMount(){
        this.postData = new FormData()
    };

    onSubmitPost= e => {
        e.preventDefault();
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
    
        newPost(userID,{
            t:jwt.token
        },this.postData)
    }
    render(){
        return(
        <div class="container">
            <div class="row">
                
                <div class="col-md-8 col-md-offset-2">
                    
                    <h1>Create post</h1>
                    
                    <form onSubmit={this.onSubmitPost}>
                    
                        <div class="form-group">
                            <label for="title">Tiêu đề</label>
                            <input rows="5" class="form-control" name="title" onChange={this.handleChange('title')}></input>
                        </div>
                        <div class="form-group">
                            <label for="contentSummary">Nội dung tóm tắt</label>
                            <textarea rows="5" class="form-control" name="contentSummary" onChange={this.handleChange('contentSummary')}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="content">Nội dung </label>
                            <textarea rows="5" class="form-control" name="content" onChange={this.handleChange('content')}></textarea>
                        </div>
                        <div class="form-group">
                            <input accept="image/*" name="photo" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
                        </div>
            
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">
                                Create
                            </button>
                        </div>
                        
                    </form>
                </div>
                
            </div>
        </div>);
    }
}


export default NewPost ;