import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';
import qs from  'qs';

class BoxSearch extends Component {
  state={
    productReview:null,
    redirect:false,
    contentQuery:''
  }
  componentDidMount(){
    var query= qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).productReview;
    this.setState({
      contentQuery:query
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit=()=>{
    this.props.history.push('/Search');
  }
  render() {
    return (
      <div className="col-sm-3">
        <div className="search-container">
          <form onSubmit={this.onSubmit}>
            <input className="search-input" defaultValue={this.state.contentQuery&&this.state.contentQuery} name='productReview' type="text" onChange={this.handleChange('productReview')} id="search-query" placeholder="Tìm kiếm sản phẩm review" spellCheck="false" />
            <button onClick={this.onSubmit} type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(BoxSearch);