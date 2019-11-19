import React, { Component } from 'react';
import { connect } from 'react-redux';

class profileDetail extends Component{

    render() {
        return(
            <div className="row clsAbtMe">
            <article className="ContentAbtMe col-lg-12">
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepName">Tên</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepName">{this.props.profile.name}</span>
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepSex">Giới tính</label></aside>
                    <div className="inProfileCol">
                        
                        <span className="getinFName" id="pepSex" >
                            {this.props.profile.gender}
                        </span >    
                        
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepBD">Ngày sinh</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepBD" >
                            {this.props.profile.birthday}
                        </span >   
                    </div>
                </div>
                <div className="row rowProFile">
                    <aside className="txtProfileCol"><label htmlFor="pepAdd">Địa chỉ</label></aside>
                    <div className="inProfileCol">
                        <span className="getinFName" id="pepAdd" >
                            {this.props.profile.address}
                        </span >   
                    </div>
                </div>
                <div className="row rowProFile ">
                    <aside className="txtProfileCol "><label htmlFor="pepEmail ">Email</label></aside>
                    <div className="inProfileCol ">
                        <span className="getinFName" id="pepEmail" >
                            {this.props.profile.email}
                        </span >  
                    </div>
                </div>
                
            </article>
        </div>
        );
    }
}

function mapStateToProp(state){
    return{
        profile: state.user.profile
    }
}

export default connect(mapStateToProp,{fetch})(profileDetail);