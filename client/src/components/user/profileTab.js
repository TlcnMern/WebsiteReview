import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default class PofileTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
            <Row>
               <div >
                <div class="row">
                    <div class="col-md-5">
                        <label>Email</label>
                    </div>
                    <div class="col-md-5">
                        <p>huyhoangvo1001@gmail.com</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Số điện thoại</label>
                    </div>
                    <div class="col-md-6">
                        <p>12345678</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Ngày sinh</label>
                    </div>
                    <div class="col-md-6">
                        <p>20/11/1998</p>
                    </div>
                </div>
            </div>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
