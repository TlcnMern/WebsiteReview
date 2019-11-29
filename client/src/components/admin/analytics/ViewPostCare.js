import React, { Component } from 'react';
import { API_URL } from '../../../config/helper';

class TopFiveCare extends Component {

    render() {
        return (
            <div className="clsTop row top-Care">
                <div className="col-sm-1"><i className="fa fa-eye" aria-hidden="true" /></div>
                <div className="row col-sm-9">
                    <div className="col-sm-4 top-Avatar">
                        <img className="anhdd" src={`${API_URL}/` + this.props.post.photo[0]} style={{ maxWidth: '30px', height: '30px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                    </div>
                    <div className="col-sm 8 top-Detail">
                        <div className="top-DetailTitle">
                            <span>{this.props.post.title}</span>
                            <br />
                            {this.props.post.postedBy.name}
                        </div>

                    </div>
                </div>
                <div className="col-sm-2">
                    <div className="top-Content">
                        <span>point:{this.props.post.pointRating.point}</span><br/>
                        <span>vote:{this.props.post.pointRating.totalRate}</span>
                    </div>
                </div>
            </div>
        );
    }
}



export default TopFiveCare;




