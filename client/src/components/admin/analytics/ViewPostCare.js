import React, { Component } from 'react';
import { API_URL } from '../../../config/helper';

class TopFiveCare extends Component {

    render() {
        return (
            <div className="clsTop row top-Care">
                <div className="col-sm-1"><i className="fa fa-eye" aria-hidden="true" /></div>
                <div className="row col-sm-9">
                    <div className="col-sm-3 top-Avatar">
                        <img className="anhdd" src={`${API_URL}/` + this.props.post.photo[0]} style={{ maxWidth: '46px', height: '46px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                    </div>
                    <div className="col-sm 9 top-Detail">
                        <div className="top-DetailTitle">
                            <span id="top-DetailTitle-title">{this.props.post.title}</span>
                            <br />
                            <span id="top-DetailTitle-author">{this.props.post.postedBy.name}</span>
                        </div>

                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="top-Content">
                        <span id="top-Content-point">{this.props.post.pointRating.point}/5</span><br/>
                        <span id="top-Content-vote">{this.props.post.pointRating.totalRate} vote</span>
                    </div>
                </div>
            </div>
        );
    }
}



export default TopFiveCare;




