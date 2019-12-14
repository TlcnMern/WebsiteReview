import React, { Component } from 'react';
import "../../public/stylesheets/partials/pagination.css"
class Paginate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: this.props.pager
        };
    }

    componentDidMount() {
        // console.log(this.props.pager)
        this.setState({
            pager: this.props.pager
        })
    }

    onClickChangePage = (page) => {
        this.props.onCallbackChange(page);
    }

    render() {
        var pager = this.props.pager;
        if (!pager.pages || pager.pages <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        var pages = [];
        for (var i = 1; i <= pager.pages; i++) {
            pages.push(i);
        }
        console.log(this.props.pager)

        return (
            <ul className="pagination">
                {/* kiem tra co phai dang o trang hien tai hay khong */}
                <li>
                    {parseInt(pager.page) === 1 ?
                        <button disabled onClick={() => this.onClickChangePage(1)}>First</button> :
                        <button onClick={() => this.onClickChangePage(1)}>First</button>
                    }
                </li>
                <li >
                    {parseInt(pager.page) === 1 ?
                        <button disabled onClick={() => this.onClickChangePage(parseInt(pager.page) - 1)}>Previous</button> :
                        <button onClick={() => this.onClickChangePage(parseInt(pager.page) - 1)}>Previous</button>
                    }
                </li>
                {pages.map((page, index) =>
                    <li key={index}>
                        <button className={parseInt(pager.page) === page ? 'activehehe' : ''} onClick={() => this.onClickChangePage(page)}>{page}</button>
                    </li>
                )}
                <li>
                    {parseInt(pager.page) === pager.pages?
                        <button disabled onClick={() => this.onClickChangePage(parseInt(pager.page) + 1)}>Next</button> :
                        <button onClick={() => this.onClickChangePage(parseInt(pager.page) + 1)}>Next</button>
                    }
                </li>
                <li>
                    {parseInt(pager.page) === pager.pages ?
                        <button disabled onClick={() => this.onClickChangePage(pager.pages)}>Last</button> :
                        <button onClick={() => this.onClickChangePage(pager.pages)}>Last</button>
                    }
                </li>
            </ul>
        );
    }
}

export default Paginate