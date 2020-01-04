import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/images/logo1.png';
import { cleanBodyAdmin } from '../../action/userAction';
import { connect } from 'react-redux';
class HeaderAdmin extends Component {

  onCallBackToUser = () => {
    this.props.cleanBodyAdmin();
  }

  render() {
    return (
      <div className="topnav">
        <div className="row">
          <div className="col-sm-2">
            <Link to="/Admin">
              <img src={logo} style={{ marginLeft: '20px', maxWidth: '230px', maxHeight: '40px', width: 'auto', height: 'auto' }} alt="2R4U" />
            </Link>
          </div>
          <div className="col-sm-7">
            <span className="txtTOP">TRANG QUẢN LÝ ADMIN</span>
          </div>
          <div className="col-sm-3">
            <Link to="/" onClick={this.onCallBackToUser}>
              Quay về trang user
            </Link>
          </div>
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
});
export default connect(mapStateToProps, { cleanBodyAdmin })(HeaderAdmin);