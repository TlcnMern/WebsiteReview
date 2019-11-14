import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import {API_URL,auth} from '../../action/helper';
import man from '../../public/images/man.png'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class MainFeed extends Component{
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          renderHome:true,
          renderFilm:false,
          renderMusic:false,
          renderTV:false,
          renderBook:false,
          renderFood:false,
          renderTravel:false,
          renderBeauty:false,
        };
    
        this.onClickHome=this.onClickHome.bind(this);
        this.onClickFilm=this.onClickFilm.bind(this);
        this.onClickMusic=this.onClickMusic.bind(this);
        this.onClickTV=this.onClickTV.bind(this);
        this.onClickBook=this.onClickBook.bind(this);
        this.onClickFood=this.onClickFood.bind(this);
        this.onClickTravel=this.onClickTravel.bind(this);
        this.onClickBeauty=this.onClickBeauty.bind(this);
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
      onClickHome(){
        this.setState({renderHome:true});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickFilm(){
        this.setState({renderFilm:true});
        this.setState({renderHome:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickMusic(){
        this.setState({renderMusic:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickTV(){
        this.setState({renderTV:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickBook(){
        this.setState({renderBook:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickFood(){
        this.setState({renderFood:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderTravel:false});
        this.setState({renderBeauty:false});
      };
      onClickTravel(){
        this.setState({renderTravel:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderBeauty:false});
      };
      onClickBeauty(){
        this.setState({renderBeauty:true});
        this.setState({renderHome:false});
        this.setState({renderFilm:false});
        this.setState({renderMusic:false});
        this.setState({renderTV:false});
        this.setState({renderBook:false});
        this.setState({renderFood:false});
        this.setState({renderTravel:false});
      };
     
      rendermyMenu(){
        if(this.state.renderHome)
          return (
            <ul id="myMenu">
                <li>
            <Link to="/" className="active-Left" >
               <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm}>
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed" onClick={this.onClickMusic}>
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình
                
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
               <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
               <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
               <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul>

          ) ;
        if(this.state.renderFilm)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" className="active-Left">
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed" onClick={this.onClickMusic}>
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul>

          ) ;
        if(this.state.renderMusic)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed" className="active-Left" >
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul> 
        ) ;
        if(this.state.renderTV)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed" onClick={this.onClickMusic} >
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" className="active-Left" >  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul> 
         ) ;
        if(this.state.renderBook)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed" onClick={this.onClickMusic}>
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" className="active-Left"  >
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul> );
        if(this.state.renderFood)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed"  onClick={this.onClickMusic} >
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" className="active-Left">
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel}>
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul> 
         ) ;
        if(this.state.renderTravel)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed"  onClick={this.onClickMusic}>
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" className="active-Left" >
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" onClick={this.onClickBeauty}>
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul>  
        ) ;
        if(this.state.renderBeauty)
          return (
            <ul id="myMenu">
            <li>
            <Link to="/" onClick={this.onClickHome}>
                <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu"/> Trang chủ
            </Link>
            </li>
            <li>
            <Link to="FilmFeed" onClick={this.onClickFilm} >
                <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh"/> Phim ảnh
            </Link>
            </li>
            <li>
            <Link to="MusicFeed"  onClick={this.onClickMusic}>
                <img src="https://img.icons8.com/ios/30/000000/music.png" alt="AmNhac"/> Âm nhạc
            </Link>
            </li>
            <li>
            <Link to="TVFeed" onClick={this.onClickTV}>  
                <img src="https://img.icons8.com/ios/30/000000/retro-tv.png" alt="TruyenHinh"/> Truyền hình  
            </Link>
            </li>
            <li>
            <Link to="BookFeed" onClick={this.onClickBook}>
                <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen"/> Sách / Truyện
            </Link>
            </li>
            <li>
            <Link to="FoodFeed" onClick={this.onClickFood}>
                <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong"/> Ăn uống
            </Link>
            </li>
            <li>
            <Link to="TravelFeed" onClick={this.onClickTravel} >
                <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich"/> Du lịch
            </Link>
            </li>
            <li>
            <Link to="BeautyFeed" className="active-Left" >
                <img src="https://img.icons8.com/ios/30/000000/eye-shadows--v2.png" alt="LamDep"/> Sắc đẹp
            </Link>
            </li>

        </ul>  ) ;
      }
      renderPersonalorLogin(){
        const avatar=auth.getAvatar();
        var urlAvatar='';
        var name=auth.getName();
        if(avatar){
            if(avatar.search('dist')>0){
                urlAvatar=API_URL+'/'+avatar;
            }
            else{
                urlAvatar=avatar;
            }
        }
        else{
            urlAvatar=man;
        }
        if (this.props.isAuthenticated) {
            return (
            <div className="imgAvatar" id="clsimgAvatar">
                <img id="anhdd" src={urlAvatar} alt="imgUser" />
                <Link to="/ViewProfile">{name} <br/></Link>
            </div>
            );
          }
          else
          return(
            <div className="btnDangNhap" id="clsbtnDangNhap">
                <Link to="/Login">  <button id="btnUser" type="button" onClick={this.clickUser}>Đăng Nhập</button></Link>
            </div>
          );
      }
    render() {
      
        return(
            <div className="contentMain">
                <div className="row">
            
                    <div className=" boxPersonal">
                        
                        {this.renderPersonalorLogin()} 
                        {this.rendermyMenu()}   

                    </div>
                    <div className="boxTopContent ">
                        <div className="bg-white ">
                        <Link to="/NewPost">
                            <button type="button "  className="btnDangBai ">Đăng bài</button>
                        </Link>
                        </div>
                        <div className="bg-white ">
                            <span>BÀI VIẾT NỔI TRỘI</span>

                            <hr/>
                            <div className="row ">
                                <div className="col-sm-2 ">
                                    <div className="imgDD ">
                                        <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05 " width="40px " height="50px " alt="imgDemo1 " />
                                    </div>
                                </div>
                                <div className="col-sm-10 ">
                                    <Link to="/DetailPost">Hotel Del Luna</Link>
                                    <div className="text-muted " style={{display: 'table-cell', verticalalign: 'middle',lineheight:'25px' }}>
                                        <Link to="/GuestViewProfile"><img width="22px " height="22px " className="user_avatar_link " src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/p960x960/72701345_964247143929133_5610529934977007616_o.jpg?_nc_cat=108&cachebreaker=hd&_nc_oc=AQk8kHSTIH3zGKJhJ1_ozUX-5HnogxpMC2Duv07HicF99Xr61wpEk3AjgzHGMkI98f8&_nc_ht=scontent.fsgn2-3.fna&oh=a50ee3696a6513807b6e99fb9bc539e3&oe=5E571E05" alt="Nguyễn Tuấn Vũ "/></Link> 16-09-2019
                                        <i className="fa fa-eye "></i> 37
                                        <i className="fa fa-heart "></i> 0
                                        <i className="fa fa-comments "></i> 0
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
        
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  export default connect(mapStateToProps)(MainFeed);