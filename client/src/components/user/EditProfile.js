import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../../public/stylesheets/partials/editProfie.css";

import {update} from '../../action/userAction';
import {auth} from '../../action/helper';

class ViewProfie extends Component{

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            gender:''
        }
        this.onTodoChange=this.onTodoChange.bind(this);
        this.onClickSave=this.onClickSave.bind(this);
    }

    componentDidMount(){
        this.userData = new FormData();
        this.setState({
            name:this.props.profile.name,
            email:this.props.profile.email,
            gender:this.props.profile.gender
        })
    };
    onClickSave(){
        const jwt=auth.isAuthenticated();
        const userID=this.props.profile._id;
        update(userID,{
            t:jwt.token
        },this.userData).then((data)=>{
            if(data.err)
                console.log(data.err);
            else
                this.props.onChangeRenderEdit();
        });
    }

    onTodoChange = e => {
        this.setState({[e.target.name]: e.target.value});
        this.userData.set(e.target.name, e.target.value);
    };

    render() {
        return(
            <div >
                <div class="row">
                    <div class="col-md-5">
                        <label>Họ tên</label>
                    </div>
                    <div class="col-md-8">
                        <input className='testEdit' name="name" value={this.state.name} onChange={this.onTodoChange}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <label>Email</label>
                    </div>
                    <div class="col-md-12">
                        <input className='testEdit' name="email" value={this.state.email} onChange={this.onTodoChange}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <label>Giới tính</label>
                    </div>
                    <div class="col-md-8">
                        <input className='testEdit' name="gender" value={this.state.gender} onChange={this.onTodoChange}/>
                    </div>
                </div>
                <button style={{marginTop:'20px'}} onClick={this.onClickSave}>Lưu</button>
            </div>
        );
    }
}

function mapStateToProp(state){
    return{
        profile: state.user.profile
    }
}

export default connect(mapStateToProp)(ViewProfie);