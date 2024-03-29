import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import "../../public/stylesheets/partials/styleResponesive.css"
import logo from '../../public/images/rev.png';
import BoxSearch from '../search/BoxSearch';

class HeaderTemplate extends Component {
  render() {
    return (
      <div className="topnav">
        <div className="row">
          <div className="col-sm-2">
            <Link to="/">
              <img src={logo} style={{marginLeft: '40px',maxWidth: '230px',maxHeight: '100px',width: '150px',height: '40px'}} alt="2R4U" />
            </Link>
            
          </div>
          <div className="col-sm-7">
            <span className="txtTOP">TRANG CHỦ</span>
          </div>
          <BoxSearch/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps)(HeaderTemplate);
