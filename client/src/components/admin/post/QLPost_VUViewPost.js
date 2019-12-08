import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import Rating from '../../rating/Rating';

class VUViewPost extends Component {
    render(){
        return(
            <div className="row clsNEWFEED fadeInDown">
                <div className="col-sm-3">
                    <div className="imgDD FadeIn-load">
                        <img id="imgSP" src="https://yt3.ggpht.com/a/AGF-l78B56AcmwqlBNjlT2CZkEp5Bu6jPhCF6SuhIA=s48-c-k-c0xffffffff-no-rj-mo" alt="imgDemo1" /><br />
                        <Link to="SearchSP">Tây Ninh</Link>
                    </div>
                </div>
                <div className="col-sm-9 detail-NEWFEED FadeIn-load">
                    <div className="detail-Title">
                        <span className="txt-NameBV">Tây Ninh đẹp hú hồn</span>
                        
                        <span className="tooltiptext">Tây Ninh đẹp hú hồn</span>
                    </div>

                    <br />
                    <div className="text-muted">

                        <Link to="ViewProfile">
                            <span title="Nguyễn Tuấn Vũ"> <img width="22px " height="22px " className="user_avatar_link " src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05" alt="Nguyễn Tuấn Vũ " /></span>
                            <span style={{ marginLeft: '10px' }}>Nguyễn Tuấn Vũ</span>
                        </Link>

                        {new Intl.DateTimeFormat('en-GB', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        }).format(new Date(23/11/1998))}

                    </div>
                    <p>Tây Ninh đẹp mê ly</p>
                    <div className="rateBar">
                        <span className="rateBar-Like"><img src="https://img.icons8.com/ios/20/000000/like.png" alt="Like" /></span>
                        <span className="rateBar-Comment" >
                            <img src="https://img.icons8.com/ios/20/000000/comments.png" alt="Comment" />
                        </span>
                        <span>
                        <span> <Rating rating="4" disabled={true} /></span>
                        </span>
                    </div>
                </div>
            </div>
        );

    }
}



export default VUViewPost;
