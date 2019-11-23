import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/helper';


class ViewPostUser extends Component {


    render() {
        return (
            <div className="row">
                <div className="col-lg-3">
                    <div className="imgDD">
                        <img style={{marginBottom:'20px'}} id="imgSP" height='100%' width='100%' src={`${API_URL}/`+this.props.post.photo[0]} alt="imgDemo1" />
                    </div>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-7">
                    <Link to="SearchSP">{this.props.post.title}</Link>
                    <div className="text-muted" style={{ display: 'table-cell', verticalalign: 'middle', lineheight: '25px' }}>
                        <span>Thể loại: </span><Link to="Category"> {this.props.post.theme}|</Link>
                    <i className="fa fa-eye" aria-hidden="true"></i> 37
                    <i className="fa fa-heart" aria-hidden="true"></i> 0
                    <i className="fa fa-comments" aria-hidden="true"></i> 0
                </div>

                    <div className="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>

                    <p style={{ fontSize: '10px', textAlign: 'justify' }}>
                    {this.props.post.contentSummary}
                    </p>
                </div>

            </div>
        );
    }
}

export default ViewPostUser;