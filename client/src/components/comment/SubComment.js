import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { addSubComment} from '../../action/postAction';
import { connect } from 'react-redux';
import ViewSubComment from './ViewSubComment';

class SubComment extends Component {
    state = {
        content: '',
        listSubComment: this.props.listSubComment || [],
        reply: false
    };

    onClickReply() {
        this.setState({ reply: !this.state.reply });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    callBackResetListSubComment(newList){
        console.log(newList);
        this.setState({
            listSubComment:newList
        })
    }

    onSubmitSubComment = e => {
        e.preventDefault();
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        addSubComment(userID, { t: jwt.token }, this.props.commentId, this.state.content)
            .then((data) => {
                if (data.err)
                    console.log(data.err)
                else {
                    console.log(data);
                    this.setState({listSubComment:data});
                }
            })
    };

    renderViewSubComment() {
        if (this.state.listSubComment.length > 0) {
            return (
                this.state.listSubComment.map((item, i) => {
                     return (
                        <ViewSubComment callBackResetListSubComment={this.callBackResetListSubComment.bind(this)} commentId={this.props.commentId} SubComment={item} key={i}/>
                        );
                }));
        }

    }

    renderCreateSubComment() {
        if (this.props.isAuthenticated)
            return (
                <div>
                    <form onSubmit={this.onSubmitSubComment}>
                        <div className="col-md-12 form-group row addCmt">
                            <div className="col-md-1">
                            <img id="anhdd" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA" alt="imgUser" />
                            </div>
                            <div className="col-md-10">
                                <input className="form-control replycomment-input" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></input>
                            </div>
                            <div className="col-md-1">
                                <button type="submit" className="btnSubmitComt" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 171 171" style={{fill:'#000000'}}><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><path d="M0,171.99654v-171.99654h171.99654v171.99654z" fill="none"></path><g fill="#3498db"><path d="M10.01953,10.10303l20.12256,64.70947h130.1704zM30.1421,85.5l-20.12256,64.66772l150.29297,-64.66772z"></path></g></g></svg></button>
                            </div>
                        </div>
                    </form>		
                    <hr />			
                </div>
            );
    }

    render() {
        return (
            <div>
                
                {/* {this.props.isAuthenticated &&
                 <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Reply</button>
                } */}
                {
                   this.renderCreateSubComment()
                }
                <div style={{ marginLeft: '40px' }} >{this.renderViewSubComment()}</div>
            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps)(SubComment);
