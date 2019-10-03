import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';


export default class PofileTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      renderEdit:false
    };

    this.onClickEdit=this.onClickEdit.bind(this);
    this.onChangeRenderEdit=this.onChangeRenderEdit.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  onClickEdit(){
    this.setState({renderEdit:true});
  };
  onChangeRenderEdit(){
    console.log('render');
    this.setState({renderEdit:false});
  };

  renderViewOrEdit(){
    if(this.state.renderEdit)
      return <EditProfile onChangeRenderEdit={this.onChangeRenderEdit} /> ;
    else 
    return (
      <div>
          <ViewProfile />
          <button onClick={this.onClickEdit} >Chỉnh Sửa</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}//active: khi điều kiện là đúng nó sẽ mở tab đó ra
              onClick={() => { this.toggle('1'); }}>
              Bài viết
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Giới thiệu
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Danh sách các bài viết</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            {this.renderViewOrEdit()}     
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
