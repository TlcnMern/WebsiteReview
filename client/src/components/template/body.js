import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import { API_URL, auth } from '../../config/helper';
import man from '../../public/images/man.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/authAction';
import PostFeatured from '../post/PostFeatured';


class MainFeed extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      renderHome: true,
      renderFilm: false,
      renderBook: false,
      renderFood: false,
      renderTravel: false,
      showMenu: false,
    };

    this.onClickHome = this.onClickHome.bind(this);
    this.onClickFilm = this.onClickFilm.bind(this);
    this.onClickBook = this.onClickBook.bind(this);
    this.onClickFood = this.onClickFood.bind(this);
    this.onClickTravel = this.onClickTravel.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if(this.dropdownMenu){
      if (!this.dropdownMenu.contains(event.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
  
      }
    }
  }
  clickLogout() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
    this.props.logout();
  }

  onClickHome() {
    this.setState({ renderHome: true });
    this.setState({ renderFilm: false });
    this.setState({ renderBook: false });
    this.setState({ renderFood: false });
    this.setState({ renderTravel: false });
  };
  onClickFilm() {
    this.setState({ renderFilm: true });
    this.setState({ renderHome: false });
    this.setState({ renderBook: false });
    this.setState({ renderFood: false });
    this.setState({ renderTravel: false });
  };
  onClickBook() {
    this.setState({ renderBook: true });
    this.setState({ renderHome: false });
    this.setState({ renderFilm: false });
    this.setState({ renderFood: false });
    this.setState({ renderTravel: false });
  };
  onClickFood() {
    this.setState({ renderFood: true });
    this.setState({ renderHome: false });
    this.setState({ renderFilm: false });
    this.setState({ renderBook: false });
    this.setState({ renderTravel: false });
  };
  onClickTravel() {
    this.setState({ renderTravel: true });
    this.setState({ renderHome: false });
    this.setState({ renderFilm: false });
    this.setState({ renderBook: false });
    this.setState({ renderFood: false });
  };

  rendermyMenu() {
    if (this.state.renderHome)
      return (
        <ul id="myMenu">
          <li>
            <Link to="/" className="active-Left" >
              <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu" /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/FilmFeed" onClick={this.onClickFilm}>
              <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh" /> Phim ảnh
            </Link>
          </li>
          <li>
            <Link to="/BookFeed" onClick={this.onClickBook}>
              <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen" /> Sách / Truyện
            </Link>
          </li>
          <li>
            <Link to="/FoodFeed" onClick={this.onClickFood}>
              <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong" /> Ăn uống
            </Link>
          </li>
          <li>
            <Link to="/TravelFeed" onClick={this.onClickTravel}>
              <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich" /> Du lịch
            </Link>
          </li>

        </ul>

      );
    if (this.state.renderFilm)
      return (
        <ul id="myMenu">
          <li>
            <Link to="/" onClick={this.onClickHome}>
              <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu" /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/FilmFeed" className="active-Left">
              <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh" /> Phim ảnh
            </Link>
          </li>
          <li>
            <Link to="/BookFeed" onClick={this.onClickBook}>
              <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen" /> Sách / Truyện
            </Link>
          </li>
          <li>
            <Link to="/FoodFeed" onClick={this.onClickFood}>
              <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong" /> Ăn uống
            </Link>
          </li>
          <li>
            <Link to="/TravelFeed" onClick={this.onClickTravel}>
              <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich" /> Du lịch
            </Link>
          </li>
        </ul>

      );

    if (this.state.renderBook)
      return (
        <ul id="myMenu">
          <li>
            <Link to="/" onClick={this.onClickHome}>
              <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu" /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/FilmFeed" onClick={this.onClickFilm} >
              <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh" /> Phim ảnh
            </Link>
          </li>
          <li>
            <Link to="/BookFeed" className="active-Left"  >
              <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen" /> Sách / Truyện
            </Link>
          </li>
          <li>
            <Link to="/FoodFeed" onClick={this.onClickFood}>
              <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong" /> Ăn uống
            </Link>
          </li>
          <li>
            <Link to="/TravelFeed" onClick={this.onClickTravel}>
              <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich" /> Du lịch
            </Link>
          </li>
        </ul>);
    if (this.state.renderFood)
      return (
        <ul id="myMenu">
          <li>
            <Link to="/" onClick={this.onClickHome}>
              <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu" /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/FilmFeed" onClick={this.onClickFilm} >
              <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh" /> Phim ảnh
            </Link>
          </li>
          <li>
            <Link to="/BookFeed" onClick={this.onClickBook}>
              <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen" /> Sách / Truyện
            </Link>
          </li>
          <li>
            <Link to="/FoodFeed" className="active-Left">
              <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong" /> Ăn uống
            </Link>
          </li>
          <li>
            <Link to="/TravelFeed" onClick={this.onClickTravel}>
              <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich" /> Du lịch
            </Link>
          </li>

        </ul>
      );
    if (this.state.renderTravel)
      return (
        <ul id="myMenu">
          <li>
            <Link to="/" onClick={this.onClickHome}>
              <img src="https://img.icons8.com/ios/30/000000/home.png" alt="TrangChu" /> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/FilmFeed" onClick={this.onClickFilm} >
              <img src="https://img.icons8.com/ios/30/000000/film-reel.png" alt="PhimAnh" /> Phim ảnh
            </Link>
          </li>
          <li>
            <Link to="/BookFeed" onClick={this.onClickBook}>
              <img src="https://img.icons8.com/ios/30/000000/book-shelf.png" alt="SachTruyen" /> Sách / Truyện
            </Link>
          </li>
          <li>
            <Link to="/FoodFeed" onClick={this.onClickFood}>
              <img src="https://img.icons8.com/ios/30/000000/street-food.png" alt="AnUong" /> Ăn uống
            </Link>
          </li>
          <li>
            <Link to="/TravelFeed" className="active-Left" >
              <img src="https://img.icons8.com/ios/30/000000/trave-diary.png" alt="DuLich" /> Du lịch
            </Link>
          </li>

        </ul>
      );
  }
  renderPersonalorLogin() {
    // const avatar=auth.getAvatar();
    var avatar = this.props.avatar
    var urlAvatar;
    var name = auth.getName();
    if (avatar) {
      if (avatar.includes('dist')) {
        urlAvatar = API_URL.toString() + "/" + avatar.toString();
      }
      else {
        urlAvatar = avatar;
      }
    }
    else {
      urlAvatar = man;
    }
    if (this.props.isAuthenticated) {
      return (
        <div className="imgAvatar FadeIn-load" id="clsimgAvatar">

          <img id="anhdd" src={urlAvatar} alt="imgUser" />
          <span style={{ padding: '5px' }}>
            <Link to="/ViewProfile" style={{ maxWidth: '110px', width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', whiteSpace: 'nowrap' }}>{name}<br /></Link>
          </span>
          <button className="optionUser" onClick={this.showMenu}><i className="fa fa-bars" aria-hidden="true"></i></button>
          {
            this.state.showMenu ?
              (<div
                className="menu fadeInDown"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                {this.props.isAuthenticatedAdmin &&
                <Link to="/Admin" style={{ borderBottom: "1px solid #d1d1d1" }}><img src="https://img.icons8.com/ios/16/000000/re-enter-pincode.png" alt="changePass" />Quản lý admin</Link>
                }
                <Link to="/" onClick={this.clickLogout} ><img src="https://img.icons8.com/ios/16/000000/export.png" alt="logout" /> Đăng xuất</Link>

              </div>) : (null)
          }
        </div>
      );
    }
    else
      return (
        <div className="btnDangNhap" id="clsbtnDangNhap">
          <Link to="/Login">  <button id="btnUser" type="button" onClick={this.clickUser}>Đăng Nhập</button></Link>

        </div>
      );
  }

  render() {
    return (
      <div className="contentMain">
        <div className="row">

          <div className=" boxPersonal">

            {this.renderPersonalorLogin()}
            {this.rendermyMenu()}

          </div>
          <div className="boxTopContent ">
            <div className="bg-white ">
              <Link to="/NewPost">
                <button type="button " className="btnDangBai ">Đăng bài</button>
              </Link>
            </div>
            <div className="bg-white ">
              <span>BÀI VIẾT NỔI TRỘI</span>
              <hr />
              {this.props.isBodyAdmin &&
              <PostFeatured />
              }
            </div>
          </div>
        </div>
      </div>
    );

  }
}



const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isBodyAdmin:state.user.isBodyAdmin,
  isAuthenticatedAdmin:state.auth.isAuthenticatedAdmin,
  avatar: state.user.avatar
});
export default connect(mapStateToProps, { logout })(MainFeed);