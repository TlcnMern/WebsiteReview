import React, { Component } from 'react';
import { auth } from '../../action/helper';
import { deleteComment } from '../../action/commentAction';
import { connect } from 'react-redux';
import MenuItem from "@material-ui/core/MenuItem"
import DropDownMenu from 'material-ui/DropDownMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class FeatureOfComment extends Component {
    state = {
        content: '',
        edit: false,
        selection:''

    };

    shouldComponentUpdate(nextProp, nextState) {
        // console.log(nextState);
        return (this.state !== nextState)
    }

    onClickEdit() {
        this.setState({ edit: !this.state.edit });
        this.handleClose();
    };

    onDeleteComment() {
        const postId = this.props.postId;
        const commentId = this.props.commentId;
        const jwt = auth.isAuthenticated();
        const userID = jwt.user._id;
        this.props.deleteComment(postId, userID, { t: jwt.token }, commentId);
    }

    handleChange(event, index, value) {
        //set selection to the value selected
    this.setState({ selection : value });

    }


    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <DropDownMenu
                        value={this.state.selection}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={1} primaryText="English" >alo</MenuItem>
                        <MenuItem value={2} primaryText="Spanish" />
                        <MenuItem value={3} primaryText="French" />

                    </DropDownMenu>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps, { deleteComment })(FeatureOfComment);
