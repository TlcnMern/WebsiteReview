import React,{Component} from 'react';
import '../../public/stylesheets/partials/post.css';
import {auth} from '../../action/helper';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,ModalBody,ModalFooter,Button } from 'reactstrap';
import {newPost} from '../../action/postAction';
import {Redirect} from 'react-router-dom';

class NewPost extends Component{
    constructor(){
        super();
        this.onCloseAlert=this.onCloseAlert.bind(this);
    }
    onCloseAlert(){
        this.setState({renderAlert:false});
        this.setState({redirectHome:true});
    };
    state={
        user:{},
        render:false,
        renderAlert:false,
        redirectHome:false
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
        var flag=false;
        flag= newPost(userID,{
            t:jwt.token
        },this.postData);
        if(flag){
            this.setState({renderAlert:true});
        }
        else
            this.setState({renderAlert:false});
    }
    render(){
        return(
            
        <div className="container">
            {this.state.redirectHome? <Redirect to="/"/>:

            <Modal isOpen={this.state.renderAlert}>
                <ModalBody>
                    Ngon rồi! giờ qua trang chủ coi nha :V
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onCloseAlert}>Close</Button>
                </ModalFooter>
            </Modal>
            }

            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h1>Create post</h1>
                    <form onSubmit={this.onSubmitPost}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input rows="5" className="form-control" name="title" onChange={this.handleChange('title')} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="theme">Chuyên đề</label> <br></br>
                            <select onChange={this.handleChange('theme')} className="theme"  required>
                                <option selected value="movie">Phim</option>
                                <option value="trip">Du lịch</option>
                                <option value="food">Ẩm thực</option>
                                <option value="book">Sách</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productReview">Sản phẩm review</label>
                            <input rows="5" className="form-control" name="productReview" onChange={this.handleChange('productReview')} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link tham khảo</label>
                            <input rows="5" className="form-control" name="link" onChange={this.handleChange('link')} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contentSummary">Nội dung tóm tắt</label>
                            <textarea rows="5" className="form-control" name="contentSummary" onChange={this.handleChange('contentSummary')} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Nội dung </label>
                            <textarea rows="5" className="form-control" name="content" onChange={this.handleChange('content')} required></textarea>
                        </div>
                        <div className="form-group">
                            <input accept="image/*" name="photo" onChange={this.handleChange('photo')} id="icon-button-file" type="file"  required/>
                        </div>
            
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
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