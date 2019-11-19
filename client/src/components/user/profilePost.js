import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import { Link } from 'react-router-dom';


class profilePost extends Component {


    render() {
        return (
            <div className="row">
            <div className="col-sm-2">
                <div className="imgDD">
                    <img id="imgSP" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA" alt="imgDemo1" />
                </div>
            </div>
            <div className="col-sm-10">
                <Link to="SearchSP">Hotel Del Luna</Link>
                <div className="text-muted" style={{display: 'table-cell', verticalalign: 'middle',lineheight:'25px'}}>
                    <span>Thể loại: </span><Link to="Category"> Phim|</Link>
                    <a title="Nguyễn Tuấn Vũ" href="https://www.facebook.com/nguyentuanvu231198"><img width="22px" height="22px" className="user_avatar_link" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA" alt="Nguyễn Tuấn Vũ"/></a> 16-09-2019
                    <i className="fa fa-eye" aria-hidden="true"></i> 37
                    <i className="fa fa-heart" aria-hidden="true"></i> 0
                    <i className="fa fa-comments" aria-hidden="true"></i> 0
                </div>

                <div className="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>

                <p style={{fontSize:'10px', textAlign: 'justify'}}>Khách Sạn Ma Quái (Hotel Del Luna): Jang Man Wol là Giám đốc của khách sạn Del Luna nằm ở trung tâm thành phố Seoul với vẻ ngoài cũ kỹ. Nhiều năm trước, cô đã mắc phải một sai lầm lớn, do đó cô đã mắc kẹt tại khách
                    sạn này</p>
            </div>

        </div>
        );
    }
}

export default profilePost;