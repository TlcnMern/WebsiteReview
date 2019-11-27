import React, { Component } from 'react';
import { API_URL } from '../../../config/helper';
import ViewDetail from "./ViewDetailPost";
import PostAction from './PostAction';

class ViewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderDetail: false,
        };
    }

    onClickViewDetail = () => {
        this.setState({ renderDetail: true });
    };

    onclickClose = () => {
        this.setState({ renderDetail: false });
    };

    renderViewDetail() {
        // Chỗ này xem chi tiết bài viết
        if (this.state.renderDetail)
            return (
                <div style={{ color: 'black' }} className="boxDetail">
                    <div className="clsboxDetail QLPost_Detail">
                        <div className="clsClose">
                            <button className="boxDetail-btnClose" onClick={this.onclickClose}>x</button>
                        </div>
                        <ViewDetail post={this.props.post} />
                    </div>

                </div>
            );
    }

    render() {
        return (
            <tr className="body table-row">
                <td className="col1">{this.props.stt}</td>
                <td className="col2">
                    <img id="anhdd" src={`${API_URL}/` + this.props.post.photo[0]} alt="imgUser" />
                </td>
                <td onClickCapture={this.onClickViewDetail} className="col3">{this.props.post.title}</td>
                <td className="col4">{this.props.post.productReview}</td>
                <td className="col5"><textarea defaultValue={this.props.post.contentSummary} /></td>
                <td className="col6">
                    {new Intl.DateTimeFormat('en-GB', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    }).format(new Date(this.props.post.created))}
                </td>
                <th className="col7">{this.props.post.postedBy.name}</th>
                {this.props.post.state ?
                    <th className="col8">Đã Duyệt</th> :
                    <th className="col8">Chưa Duyệt</th>}

                <td className="col10">
                    <PostAction state={this.props.post.state} postId={this.props.post._id} callbaclReloadPage={this.props.callbaclReloadPage}/>
                </td>
                {this.renderViewDetail()}
            </tr>
        );
    }
}
export default ViewPost;
