import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dispatchBodyAdmin } from '../../../action/userAction';
import { connect } from 'react-redux';
import ViewPost from './ViewPost';
import { getPostList } from '../../../action/adminAction';
import Loading from '../../template/Loading';

class PostListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateSort: false,
            text: null,
            isLoading: true,
            posts: []
        }
        this.callbaclReloadPage=this.callbaclReloadPage.bind(this);
        this.props.dispatchBodyAdmin();
    }

    componentDidMount(){
        var query = { state: false };
        this.postList(query);
    }

    postList=(query)=>{
        getPostList(query)
        .then(data => {
            if (data.error) {
                return;
            }
            else {
                this.setState({
                    posts: data,
                    isLoading: false
                })
            }
        });
    }

    onSubmitSearch = () => {
        var query = {
            state: this.state.stateSort,
            productReview: this.state.text
        };
        this.postList(query)
    }

    callbaclReloadPage(state){
        console.log(state)
        var query;
        if(state){
            query = { state: true };
        }
        else{
            query = { state: false };
        }
        
        this.postList(query);
    }

    handleChange = (event) => {
        this.setState({
            stateSort: event.target.value
        })
        var query = {
            state: event.target.value,
            productReview: this.state.text
        };
        this.postList(query);
    }

    onChangeSearch = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <div className="boxContentAdmin">
                <div className="row ToolQL">
                    <div className="row titleQL col-lg-10">
                        <div className=" col-lg-3">
                            <p>Quản lý bài viết</p>
                        </div>
                        <div className=" col-lg-5">
                            <input style={{ padding: '0' }} name='name' type="text" onChange={this.onChangeSearch} placeholder="Tìm kiếm theo tên sản phẩm" spellCheck="false" />
                            <button onClick={this.onSubmitSearch}><i className="fa fa-search"></i></button>
                        </div>
                        <div className="row col-lg-4">
                            <span className=" box_input ">
                                <span>Trạng thái</span>
                                <select onChange={this.handleChange} >
                                    <option value={false}>Chưa duyệt</option>
                                    <option value={true}>Đã duyệt</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    <div className="PageQL col-sm-2">
                        <ul className="pagination">
                            <li>
                                <Link to="">
                                    &laquo;
                                    </Link>
                            </li>
                            <li><Link to="">1</Link></li>
                            <li><Link to="">2</Link></li>
                            <li><Link to="">3</Link></li>
                            <li>
                                <Link to="">
                                    &raquo;
                                    </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr className="table-header">
                            <th className="col1">Number</th>
                            <th className="col2">Image</th>
                            <th className="col3">Title</th>
                            <th className="col4">Product</th>
                            <th className="col5">Sumary</th>
                            <th className="col6">Date</th>
                            <th className="col7">User</th>
                            <th className="col8">State</th>
                            <th className="col10">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <Loading /> :
                            (this.state.posts.length > 0 ?
                                (this.state.posts.map((item, i) => {
                                    return <ViewPost stt={i + 1} key={i} post={item} callbaclReloadPage={this.callbaclReloadPage}/>
                                })) :
                                <span>Không tìm thấy kết quả</span>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
});
export default connect(mapStateToProps, { dispatchBodyAdmin })(PostListAdmin);
