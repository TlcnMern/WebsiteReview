import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import { Link } from 'react-router-dom';

class TopFiveCare extends Component {
    
    render() {
        return (
            <div className="clsTop row top-Care">
               <div className="col-sm-1"><i className="fa fa-eye" aria-hidden="true"/></div>
               <div className="row col-sm-9">
                   <div className="col-sm-4 top-Avatar">
                   <img className="anhdd" src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s960x960/75580401_3271033496271455_181345390526726144_o.jpg?_nc_cat=111&_nc_ohc=cd3EYeOWVggAQkUk1NXr-0ZlgUZ5mK15oHCh2DsYgbDpaCsjWzLMfzRbw&_nc_ht=scontent.fsgn2-1.fna&oh=f712909d4824a05be923439154b4e9de&oe=5E41E3D7" style={{ maxWidth: '30px', height: '30px', marginRight: '5px' }} aria-hidden alt="Picture of me taking a photo of an image" />
                   </div>
                   <div className="col-sm 8 top-Detail">
                       <div className="top-DetailTitle">
                           <span>Hà Giang đẹp quá</span>
                           <br/>
                           <Link to="GuestViewProfile">Nguyễn Tuấn Vũ</Link>
                           </div>
                       
                   </div>
               </div>
               <div className="col-sm-2">
                   <div className="top-Content">
                       <span>1250cmt</span>
                   </div>
               </div>
            </div>
        );
    }
}



export default TopFiveCare;




