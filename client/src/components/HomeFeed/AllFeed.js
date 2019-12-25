import React, { Component } from 'react';
import PostList from '../post/PostList';
import { getPostPaginate } from '../../action/postAction';
import Loading from '../template/Loading';
import Paginate from '../paginate/Paginate';

class AllFeed extends Component {
    state = {
        postList: [],
        pager: {
            total: null,
            limit: null,
            page: null,
            pages: null
        },
        isLoading: true
    };
    componentDidMount() {
        getPostPaginate(1).then((data) => {
            if (data.error)
                console.log(data.error);
            else {
                if (data)
                    this.setState({
                        postList: data.docs,
                        pager: {
                            total: data.total,
                            limit: data.limit,
                            page: data.page,
                            pages: data.pages
                        },
                        isLoading: false
                    })
            }
        });
    }

    onCallbackChange = (page) => {
        getPostPaginate(page).then((data) => {
            if (data.error)
                console.log(data.error);
            else {
                if (data)
                    this.setState({
                        postList: data.docs,
                        pager: {
                            total: data.total,
                            limit: data.limit,
                            page: data.page,
                            pages: data.pages
                        },
                        isLoading: false
                    })
                window.scrollTo(0, 0)
            }
        });
    }

    render() {
        return (
            <div className="boxContent">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-home">
                                <div className="header-list-index" style={{ margintop: '0px' }}>
                                    <span className="title-list-index">All FEED</span>
                                </div>
                                <hr />
                                {
                                    !this.state.postList ?
                                        <Loading /> :
                                        <PostList posts={this.state.postList} />
                                }
                                {!this.state.isLoading &&
                                    <Paginate pager={this.state.pager} onCallbackChange={this.onCallbackChange} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllFeed;