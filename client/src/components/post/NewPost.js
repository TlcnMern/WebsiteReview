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
        this.removeImage=this.removeImage.bind(this);
    }
    onCloseAlert(){
        this.setState({renderAlert:false});
        this.setState({redirectHome:true});
    };
    state={
        user:{},
        render:false,
        renderAlert:false,
        redirectHome:false,
        imgs:[]
    }
    handleChange= name => event => {
        var value;
        if(name==='photo'){
            this.setState({
                imgs:event.target.files
            })
        }
        else{
            value=event.target.value
            this.postData.set(name, value);
        }
    }

    componentDidMount(){
        this.postData = new FormData()
    };
    
    removeImage=(e)=>{
        var array = [...this.state.imgs]; // make a separate copy of the array
        for(var i=0;i<array.length;i++){
            if (array[i].name===e.target.value) {
              array.splice(i, 1);
              this.setState({imgs: array});
            }
        }
    }

    onSubmitPost= e => {
        e.preventDefault();
        if(this.state.imgs.length>0){
            for (let i = 0 ; i < this.state.imgs.length ; i++) {
                this.postData.append("photo", this.state.imgs[i]);
            }
        }
        const jwt=auth.isAuthenticated();
        const userID=jwt.user._id;
        newPost(userID,{t:jwt.token},this.postData)
        .then((data)=>{
            if(data.error){
                console.log(data);
                this.setState({renderAlert:false});
                return;
            }
            else{
                this.setState({renderAlert:true});
            }
        });
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
                            <input accept="image/*" multiple  name="photo" onChange={this.handleChange('photo')} id="icon-button-file" type="file"  />
                        </div>
                        {this.state.imgs && [...this.state.imgs].map((file,i)=>(
                            <div key={i}>
                                <img aria-hidden style={{maxWidth:'10%', height:'auto'}} src={URL.createObjectURL(file)}  alt="Picture of me taking a photo of an image" />
                                <button type="button" value={file.name} onClick={this.removeImage}>remove</button>
                            </div>
                        ))}


                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input rows="5" className="form-control" name="title" onChange={this.handleChange('title')}  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="theme">Chuyên đề</label> <br></br>
                            <select onChange={this.handleChange('theme')} className="theme"  >
                                <option value="movie">Phim</option>
                                <option value="trip">Du lịch</option>
                                <option value="food">Ẩm thực</option>
                                <option value="book">Sách</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productReview">Sản phẩm review</label>
                            <input rows="5" className="form-control" name="productReview" onChange={this.handleChange('productReview')} ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link tham khảo</label>
                            <input rows="5" className="form-control" name="link" onChange={this.handleChange('link')} ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contentSummary">Nội dung tóm tắt</label>
                            <textarea rows="5" className="form-control" name="contentSummary" onChange={this.handleChange('contentSummary')} ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Nội dung </label>
                            <textarea rows="5" className="form-control" name="content" onChange={this.handleChange('content')} ></textarea>
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