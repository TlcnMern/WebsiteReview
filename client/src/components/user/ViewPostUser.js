import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/helper';


class ViewPostUser extends Component {


    render() {
        return (
            <div className="row clsViewPostUser">
                <div className="col-lg-3">
                    <div className="imgDD">
                        <img style={{marginBottom:'20px', maxWidth:'120px',maxHeight:'120px',width:'auto',height:'auto'}} id="imgSP" src={`${API_URL}/`+this.props.post.photo[0]} alt="imgDemo1" />
                        <span style={{fontSize: '10px',fontWeight: 'normal',width: 'auto',maxWidth: '120px'}}>
                            {this.props.post.productReview}
                        </span>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div>
                        <Link to="SearchSP" className="ViewPostUser-title">{this.props.post.title}</Link><br/>
                    </div>
                    <div className="text-muted ViewPostUser-detail" style={{ display: 'table-cell', verticalalign: 'middle', lineheight: '25px' }}>
                        <span>Chuyên mục: </span><Link to="Category"> {this.props.post.theme}</Link>
                        <span style={{marginLeft:'10px'}}>
                            {new Intl.DateTimeFormat('en-GB', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(this.props.post.created))}
                        </span>
                    </div>

                    <div className="clsPersonalPost-Title" style={{ fontSize: '10px', textAlign: 'justify' }}>
                        <p>
                            {this.props.post.contentSummary}
                        </p>
                        <span className="PersonalPost-Titlehide">
                            {this.props.post.contentSummary}
                        </span>
                    </div>
                </div>

            </div>
        );
    }
}

export default ViewPostUser;