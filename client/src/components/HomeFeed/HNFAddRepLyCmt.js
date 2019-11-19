import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
class HNFAddRepLyCmt extends Component{

    
    render() {
        
        return(
            <div className="row AddReplyComment" id="AddReplyComment">
            <div className="col-sm-1">
                <img id="anhddreplycmt" src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05" alt="imgUser" />
            </div>
            <div className="col-sm-10">
                <input className="replycomment-input" type="text" id="comment-query" placeholder="Thêm mới bình luận" spellcheck="false"/>
            </div>
            <div className="col-sm-1">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 171 171" style={{fill:'#000000'}}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{mixblendmode: 'normal'}}><path d="M0,171.99654v-171.99654h171.99654v171.99654z" fill="none"></path><g fill="#3498db"><path d="M10.01953,10.10303l20.12256,64.70947h130.1704zM30.1421,85.5l-20.12256,64.66772l150.29297,-64.66772z"></path></g></g></svg>
            </div>
        </div>
        );
        
    }
}



export default HNFAddRepLyCmt;