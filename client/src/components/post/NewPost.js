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
            <div className="boxContent">
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
             <div className="clsBoxDangBai " id="clsBoxDangBai ">
                 <div className="clsDangBai " id="clsDangBai ">
                     <h3>Đăng bài mới</h3>
                     <form action=" " method="post " encType="multipart/form-data " onSubmit={this.onSubmitPost}>
                         <div className="post_avt text-center mt-20 ">
                            
                             <div className="avatar ">

                             <div className="form-group">
                            <input accept="image/*" multiple  name="photo" id="photoin" className="inputfile inputfile-1" onChange={this.handleChange('photo')} type="file" style={{display: 'none'}} />
                            <label htmlFor="photoin"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Choose a file&hellip;</span></label>
                            </div>
                            {this.state.imgs && [...this.state.imgs].map((file,i)=>(
                            <div key={i}>
                                <img className="imgPhotoin" aria-hidden style={{maxWidth:'10%', height:'auto'}} src={URL.createObjectURL(file)}  alt="Picture of me taking a photo of an image" />
                                <button className="btnPhotoin-remove" type="button" value={file.name} onClick={this.removeImage}>x</button>
                            </div>
                        ))}
                                 <p>Tải lên ảnh đại diện cho bài viết tại đây.<br/> Lưu ý không sử dụng ảnh có dung lượng quá 1MB</p>
                             </div>
                         </div>
                         <div className="text-center "></div>
                         <div className="content_form mt-10 ">
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label>Tiêu đề bài viết:</label></div>
                                 <div className="col-sm-10 ">
                                     <span className="box_input "><input className="form-control " name="title" onChange={this.handleChange('title')} required/></span>
                                 </div>
                             </div>
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label htmlFor="theme">Chuyên mục:</label></div>
                                 <div className="col-sm-10 ">
                                     <span className="box_input ">
                                     <select onChange={this.handleChange('theme')} className="theme"  >
                                          <option value="movie">Phim</option>
                                          <option value="trip">Du lịch</option> 
                                          <option value="food">Ẩm thực</option>
                                          <option value="book">Sách</option>
                                     </select>
                                      </span>
                                 </div>
                             </div>
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label>Sản phẩm review:</label></div>
                                 <div className="col-sm-10 ">
                                     <span className="box_input ">
                                         <input className="form-control " name="productReview" onChange={this.handleChange('productReview')} required/>
                                     </span>
                                  </div>
                             </div>
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label>Link sản phẩm:</label></div>
                                 <div className="col-sm-10 ">
                                     <span className="box_input ">
                                        <input className="form-control " name="link" onChange={this.handleChange('link')} required/>
                                    </span>
                                 </div>
                             </div>
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label>Tóm tắt cho bài viết:</label></div>           
                                 <div className="col-sm-10 ">
                                     <textarea className="form-control box-textarea " rows="4 " placeholder="Tóm tắt " style={{maxwidth: '100%'}} name="contentSummary" onChange={this.handleChange('contentSummary')} required></textarea>
                                 </div>
                             </div>
                             <div className="row form-group ">
                                 <div className="col-sm-2 pr-0 text-right "><label>Bài viết:</label></div>
                                 <div className="col-sm-10 ">
                                     <textarea className="form-control box-textarea " rows="4 " placeholder="Viết mọi thứ tại đây " style={{maxwidth: '100%'}} name="content" onChange={this.handleChange('content')} required></textarea>
                                 </div>
                             </div>
                             <div className="row form-group text-center ">
                                 <div className="col-sm-2 pr-0 text-right "><label></label></div>
                                 <div className="col-sm-10 ">
                                     <button className="btn_res " type="submit">Gửi</button>
                              </div>
                         </div>
                     </div>
                 </form>
             </div>
            </div>
        </div>

         
            
    //     <div className="container">
    //         {this.state.redirectHome? <Redirect to="/"/>:
    //         <Modal isOpen={this.state.renderAlert}>
    //             <ModalBody>
    //                 Ngon rồi! giờ qua trang chủ coi nha :V
    //             </ModalBody>
    //             <ModalFooter>
    //                 <Button color="primary" onClick={this.onCloseAlert}>Close</Button>
    //             </ModalFooter>
    //         </Modal>
    //         }
    //         <div className="row">
    //             <div className="col-md-8 col-md-offset-2">
    //                 <h1>Create post</h1>
    //                 <form onSubmit={this.onSubmitPost}>
    //                     <div className="form-group">
    //                         <input accept="image/*" multiple  name="photo" onChange={this.handleChange('photo')} id="icon-button-file" type="file"  />
    //                     </div>
    //                     {this.state.imgs && [...this.state.imgs].map((file,i)=>(
    //                         <div key={i}>
    //                             <img aria-hidden style={{maxWidth:'10%', height:'auto'}} src={URL.createObjectURL(file)}  alt="Picture of me taking a photo of an image" />
    //                             <button type="button" value={file.name} onClick={this.removeImage}>remove</button>
    //                         </div>
    //                     ))}


    //                     <div className="form-group">
    //                         <label htmlFor="title">Tiêu đề</label>
    //                         <input rows="5" className="form-control" name="title" onChange={this.handleChange('title')}  />
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="theme">Chuyên đề</label> <br></br>
    //                         <select onChange={this.handleChange('theme')} className="theme"  >
    //                             <option value="movie">Phim</option>
    //                             <option value="trip">Du lịch</option>
    //                             <option value="food">Ẩm thực</option>
    //                             <option value="book">Sách</option>
    //                         </select>
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="productReview">Sản phẩm review</label>
    //                         <input rows="5" className="form-control" name="productReview" onChange={this.handleChange('productReview')} ></input>
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="link">Link tham khảo</label>
    //                         <input rows="5" className="form-control" name="link" onChange={this.handleChange('link')} ></input>
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="contentSummary">Nội dung tóm tắt</label>
    //                         <textarea rows="5" className="form-control" name="contentSummary" onChange={this.handleChange('contentSummary')} ></textarea>
    //                     </div>
    //                     <div className="form-group">
    //                         <label htmlFor="content">Nội dung </label>
    //                         <textarea rows="5" className="form-control" name="content" onChange={this.handleChange('content')} ></textarea>
    //                     </div>
    //                     <div className="form-group">
    //                         <button type="submit" className="btn btn-primary">
    //                             Create
    //                         </button>
    //                     </div>
                        
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    );
     }
}


export default NewPost ;