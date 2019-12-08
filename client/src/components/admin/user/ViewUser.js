import React, { Component } from 'react';
// import { API_URL } from '../../../config/helper';

class ViewPost extends Component {

    render() {
        return (
            <tr className="body table-row">
                <td className="col1">{this.props.stt}</td>
                <td className="col2">{this.props.user.name}</td>
                <td className="col3">{
                this.props.user.local?this.props.user.local.email:
                (this.props.user.google?this.props.user.google.email:null)
                }</td>
                <td className="col4">{this.props.user.gender}</td>
            </tr>
        );
    }
}
export default ViewPost;
