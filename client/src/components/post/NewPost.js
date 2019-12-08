import React, { Component } from 'react';
import '../../public/stylesheets/partials/post.css';
import { auth } from '../../config/helper';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { newPost } from '../../action/postAction';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
    constructor() {
        super();
        this.onCloseAlert = this.onCloseAlert.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }
    onCloseAlert() {
        this.setState({ renderAlert: false });
        this.setState({ redirectHome: true });
    };
    state = {
        user: {},
        render: false,
        renderAlert: false,
        redirectHome: false,
        imgs: []
    }
    handleChange = name => event => {
        var value;
        if (name === 'photo') {
            this.setState({
                imgs: event.target.files
            })
        }
        else {

            value = event.target.value
            this.postData.set(name, value);
            if (name === 'theme') {
                this.setState({
                    theme: event.target.value
                })
            }
        }
    }

    componentDidMount() {
        this.postData = new FormData()
    };

    removeImage = (e) => {
        var array = [...this.state.imgs]; // make a separate copy of the array
        for (var i = 0; i < array.length; i++) {
            if (array[i].name === e.target.value) {
                array.splice(i, 1);
                this.setState({ imgs: array });
            }
        }
    }

    onSubmitPost = e => {
        e.preventDefault();
        if (this.state.imgs.length > 0) {
            for (let i = 0; i < this.state.imgs.length; i++) {
                this.postData.append("photo", this.state.imgs[i]);
            }
        }
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        newPost(userID, { t: jwt.token }, this.postData)
            .then((data) => {
                if (data.error) {
                    console.log(data);
                    this.setState({ renderAlert: false });
                    return;
                }
                else {
                    this.setState({ renderAlert: true });
                }
            });
    }

    renderCommon() {
        return (
            <div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Link tham khảo:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="link" onChange={this.handleChange('link')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Link youtube:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="linkYoutube" onChange={this.handleChange('linkYoutube')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Tóm tắt cho bài viết:</label></div>
                    <div className="col-sm-10 ">
                        <textarea className="form-control box-textarea " rows="4 " placeholder="Tóm tắt " style={{ maxwidth: '100%' }} name="contentSummary" onChange={this.handleChange('contentSummary')} required></textarea>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Bài viết:</label></div>
                    <div className="col-sm-10 ">
                        <textarea className="form-control box-textarea " rows="4 " placeholder="Viết mọi thứ tại đây " style={{ maxwidth: '100%' }} name="content" onChange={this.handleChange('content')} required></textarea>
                    </div>
                </div>

                <div className="row form-group content-row">
                <div className="col-sm-2 pr-0 text-right "><label>Chọn ảnh:</label><br/><span style={{color:'#dbdbdb', fontSize:'10px',fontStyle:'Italic'}}>(Có thể chọn nhiều hơn 1 ảnh)</span><br/></div>
                    <div className="col-sm-10 row avatar ">
                        
                        <div className="form-group">
                            <input accept="image/*" multiple name="photo" id="photoin" className="inputfile inputfile-1" onChange={this.handleChange('photo')} type="file" style={{ display: 'none' }} />
                            <label htmlFor="photoin"><img src="https://img.icons8.com/dusk/100/000000/add-image.png" alt="addImg"/></label>
                        </div>
                        <div className="row clsPhotoin">
                            
                            {this.state.imgs && [...this.state.imgs].map((file, i) => (
                                <div id="createPostImg" key={i}>
                                    <img className="imgPhotoin" aria-hidden style={{ maxWidth: '100%', height: '100%' }} src={URL.createObjectURL(file)} alt="Picture of me taking a photo of an image" />
                                    <button className="btnPhotoin-remove" type="button" value={file.name} onClick={this.removeImage}><i className="fa fa-times" aria-hidden="true"></i></button>
                                </div>))}
                        </div>
                    </div>
                </div>
                <div className="row form-group text-center content-row">
                    <div className="col-sm-2 pr-0 text-right "><label></label></div>
                    <div className="col-sm-10 ">
                        <button className="btn_res " type="submit">Gửi</button>
                    </div>
                </div>
            </div>
        );
    }


    renderCreateFilm() {
        return (
            <div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Tên bộ phim:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="productReview" onChange={this.handleChange('productReview')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="kind">Thể loại:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <select onChange={this.handleChange('kind')} className="kind"  >
                                <option disabled selected value> --Thể loại-- </option>
                                <option value="action">Hành động</option>
                                <option value="swordplay">Cổ trang</option>
                                <option value="love">Tình cảm</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="formality">Hình thức:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">  
                            <select onChange={this.handleChange('formality')} className="formality"  >
                                <option disabled selected value> --Hình thức-- </option>
                                <option value="odd">Phim lẻ</option>
                                <option value="series">Phim bộ</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    renderCreateTrip() {
        return (
            <div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Địa điểm du lịch</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="productReview" onChange={this.handleChange('productReview')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="kind">Loại hình:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <select onChange={this.handleChange('kind')} className="kind"  >
                                <option disabled selected value> --Loại hình-- </option>
                                <option value="Ecotourism">Du lịch sinh thái </option>
                                <option value="Resort">Khu nghỉ dưỡng</option>
                                <option value="Sightseeing">Tham quan chụp ảnh</option>
                            </select>
                        </span>
                    </div> 
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="theme">Hình thức:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">  
                            <select onChange={this.handleChange('formality')} className="formality"  >
                                <option disabled selected value> --Hình thức-- </option>
                                <option value="Tour">Tour</option>
                                <option value="TourFE">Tour Free and Easy</option>
                                <option value="LandTour">Land Tour</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    renderCreateFood() {
        return (
            <div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Tên món ăn</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="productReview" onChange={this.handleChange('productReview')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="kind">Loại hình:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <select onChange={this.handleChange('kind')} className="kind"  >
                                <option disabled selected value> --Loại hình-- </option>
                                <option value="food">Đồ ăn</option>
                                <option value="drink">Nước uống</option>
                            </select>
                        </span>
                    </div> 
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="theme">Hình thức:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">  
                           
                            <select onChange={this.handleChange('formality')} className="formality"  >
                                <option disabled selected value> --Hình thức-- </option>
                                <option value="restaurant">Nhà Hàng</option>
                                <option value="snacks">Ăn vẹt</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    renderCreateBook() {
        return (
            <div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label>Tên sách</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">
                            <input className="form-control " name="productReview" onChange={this.handleChange('productReview')} required />
                        </span>
                    </div>
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="kind">Thể loại:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">   
                            <select onChange={this.handleChange('kind')} className="kind"  >
                                <option disabled selected value> --Thể loại-- </option>
                                <option value="literary">Văn học</option>
                                <option value="science">Khoa học kỹ thuật</option>
                                <option value="novel">Tiểu thuyết</option>
                                <option value="story">Truyện</option>
                            </select>
                        </span>  
                    </div> 
                </div>
                <div className="row form-group content-row">
                    <div className="col-sm-2 pr-0 text-right "><label htmlFor="formality">Ngôn ngữ:</label></div>
                    <div className="col-sm-10 ">
                        <span className="box_input ">  
                           
                            <select onChange={this.handleChange('formality')} className="formality"  >
                                <option disabled selected value> --Ngôn ngữ-- </option>
                                <option value="Vietnamese">Sách tiếng Việt</option>
                                <option value="foreignLanguage">Sách nước ngoài</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="boxContent">
                {this.state.redirectHome ? <Redirect to="/" /> :

                    <Modal isOpen={this.state.renderAlert}>
                        <ModalBody>
                            Bài viết đang được chờ duyệt
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onCloseAlert}>Close</Button>
                        </ModalFooter>
                    </Modal>
                }
                <div className="clsBoxDangBai " id="clsBoxDangBai ">
                    <span style={{ padding:'10px',margin:'5px',display:'flex',borderBottom:'1px solid #d1d1d1', fontSize:'18px',color:'#00afef' }}>Đăng bài 
                        <i style={{position:'absolute',right:'0', color:'#dbdbdb',padding:'10px'}} className="fa fa-question-circle iconNote" aria-hidden="true">
                            <span className="spanNote">
                                <div className="arrow"></div>
                                BÀI VIẾT HIỆU QUẢ <br/>
                                Bài viết phải đầy đủ thông tin cần thiết<br/>
                                Bài viết hạn chế teencode/ sai chính tả<br/>
                                Hình ảnh phải liên quan đến bài đánh giá. Bạn có thể chọn nhiều hình cùng một lúc<br/>
                            </span>
                        </i>
                    </span>
                    
                    <div className="clsDangBai " id="clsDangBai ">
                        <form action=" " method="post " encType="multipart/form-data " onSubmit={this.onSubmitPost}>
                            <div className="row">

                                <div className="content_form  col-sm-12">
                                    <div className="row form-group content-row">
                                        <div className="col-sm-2 pr-0 text-right "><label>Tiêu đề bài viết:</label></div>
                                        <div className="col-sm-10 ">
                                            <span className="box_input "><input className="form-control " name="title" onChange={this.handleChange('title')} required /></span>
                                        </div>
                                    </div>
                                    <div className="row form-group content-row">
                                        <div className="col-sm-2 pr-0 text-right "><label htmlFor="theme">Chuyên mục:</label></div>
                                        <div className="col-sm-10 ">
                                            <span className="box_input ">
                                                <select onChange={this.handleChange('theme')} className="theme"  >
                                                    <option disabled selected value> --Chọn chuyên mục-- </option>
                                                    <option value="film">Phim</option>
                                                    <option value="trip">Du lịch</option>
                                                    <option value="food">Ẩm thực</option>
                                                    <option value="book">Sách</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>

                                    {
                                        (this.state.theme === 'film') ? this.renderCreateFilm() : <div></div>
                                    }
                                    {
                                          (this.state.theme === 'trip') ? this.renderCreateTrip() : <div></div>
                                    }
                                                                        {
                                          (this.state.theme === 'food') ? this.renderCreateFood() : <div></div>
                                    }
                                                                        {
                                          (this.state.theme === 'book') ? this.renderCreateBook() : <div></div>
                                    }
                                    {
                                        (this.state.theme) ? this.renderCommon() : <div></div>
                                    }



                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default NewPost;