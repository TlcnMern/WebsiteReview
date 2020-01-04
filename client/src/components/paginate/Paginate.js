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

    calculatorPage(){
        var pager = this.props.pager;
        var startPage, endPage;
        if (pager.pages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = pager.pages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (pager.page <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (pager.page + 4 >= pager.pages) {
                startPage = pager.pages - 9;
                endPage = pager.pages;
            } else {
                startPage = pager.page - 5;
                endPage = pager.page + 4;
            }
        }
        var pages = [];
        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    render() {
        var pager = this.props.pager;
        if (!pager.pages || pager.pages <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
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
                {this.calculatorPage().map((page, index) =>
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