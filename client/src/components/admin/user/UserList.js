import React, { Component } from 'react';
import { dispatchBodyAdmin } from '../../../action/userAction';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { getUserList } from '../../../action/adminAction';
import Loading from '../../template/Loading';
import ViewUser from './ViewUser';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: null,
            users:[],
            arrayTotal:[]
        }
        this.props.dispatchBodyAdmin();
    }

    componentDidMount(){
        var query = null;
        this.listUser(query);
    }

    listUser=(query)=>{
        getUserList(query)
        .then(data => {
            if (data.error) {
                return;
            }
            else {
                this.setState({
                    users: data,
                    isLoading: false
                })
            }
        });
    }

    onChangeSearch = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    onSubmitSearch = () => {
        var query = {
            name: this.state.text
        };
        this.listUser(query)
    }

    render() {
        if(!this.props.isAuthenticatedAdmin){
            return <Redirect to="/Login"/>
        }
        return (
            <div className="row ToolQ boxContentAdmin">
                <div className="row ToolQL">
                    <div className="row titleQL col-sm-10">
                        <div className="col-lg-3">
                            <p>Quản lý người dùng</p>
                        </div>
                        <div className=" col-lg-5">
                            <input style={{ padding: '0' }} name='name' type="text" onChange={this.onChangeSearch} placeholder="Tìm kiếm theo tên sản phẩm" spellCheck="false" />
                            <button id="QLU-btnSearch" onClick={this.onSubmitSearch}><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                    <div className="PageQL col-sm-2">
                        
                    </div>
                </div>

                <table>
                    <thead>
                        <tr className="table-header">
                            <th className="col1">Number</th>
                            <th className="col2">Full Name</th>
                            <th className="col3">Email</th>
                            <th className="col4">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <Loading /> :
                            (this.state.users.length > 0 ?
                                (this.state.users.map((item, i) => {
                                    return <ViewUser stt={i + 1} totalPost={this.state.arrayTotal[i]} key={i} user={item} />
                                })) :
                                <span>Không tìm thấy kết quả</span>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
});
export default connect(mapStateToProps, { dispatchBodyAdmin })(UserList);
