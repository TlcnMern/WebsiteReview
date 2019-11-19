import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';

class BoxSearch extends Component {

  state={
    title:null,
    redirect:false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit=()=>{
    if(this.state.title===null){
      return
    }
    this.props.history.push('/Search');
  }
  render() {
    return (
      <div className="col-sm-3">
        <div className="search-container">
          <form onSubmit={this.onSubmit}>
            <input className="search-input" name='title' type="text" onChange={this.handleChange('title')} id="search-query" placeholder="Tìm kiếm" spellCheck="false" />
            <button onClick={this.onSubmit} type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    );
  }
}


// export default BoxSearch;
export default withRouter(BoxSearch);