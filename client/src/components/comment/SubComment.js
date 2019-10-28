import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { addSubComment} from '../../action/postAction';
import { connect } from 'react-redux';

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
                        <li key={i}>
                            <div>
                                <h6>{item.commentBy.name}</h6>
                                <p>{item.content}</p>
                                <p>
                                    {item.created}
                                </p>
                            </div>
                        </li>);
                }));
        }
    }

    renderCreateSubComment() {
        if (this.props.isAuthenticated)
            return (
                <div>
                    <form onSubmit={this.onSubmitSubComment}>
                        <div className="col-md-12 form-group">
                            <textarea className="form-control" id="comment" placeholder="Comment" onChange={this.handleChange('content')}></textarea>
                        </div>
                        <div className="col-md-12 form-group text-right">
                            <button type="submit" className="btn btn-primary" >Send</button>
                        </div>
                    </form>
                    <hr />
                </div>

            );
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated &&
                 <button onClick={this.onClickReply.bind(this)} className="btn btn-link" style={{ marginLeft: '10px' }}>Reply</button>
                }
                {
                    this.state.reply && this.renderCreateSubComment()
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
