import React, { Component } from 'react';
import GoogleChart from "./GoogleChart";
import LineChart from "./LineChart";
import { getQuantityUsersEachMonth, getQuantityPostFollowThemeEachMonth } from '../../../action/adminAction';
import Loading from '../../template/Loading';

class Chart extends Component {
    state = {
        isLoadingLine: true,
        isLoadingGoogle: true,
        dataLineChart: [],
        dataGoogleChart: []
    }
    componentDidMount() {
        getQuantityUsersEachMonth().then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                var t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0;
                data.forEach(element => {
                    switch (element._id.month) {
                        case 1: {
                            t1 = element.count
                            break;
                        }
                        case 2: {
                            t2 = element.count
                            break;
                        }
                        case 3: {
                            t3 = element.count
                            break;
                        }
                        case 4: {
                            t4 = element.count
                            break;
                        }
                        case 5: {
                            t5 = element.count
                            break;
                        }
                        case 6: {
                            t6 = element.count
                            break;
                        }
                        case 7: {
                            t7 = element.count
                            break;
                        }
                        case 8: {
                            t8 = element.count
                            break;
                        }
                        case 9: {
                            t9 = element.count
                            break;
                        }
                        case 10: {
                            t10 = element.count
                            break;
                        }
                        case 11: {
                            t11 = element.count
                            break;
                        }
                        case 12: {
                            t12 = element.count
                            break;
                        }
                        default: {

                        }
                    }

                })
                var arrData = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12];

                this.setState({
                    isLoadingLine: false,
                    dataLineChart: arrData
                })
            }
        });


        getQuantityPostFollowThemeEachMonth().then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                console.log(data)
                var t1, t2, t3, t4, t5, t6, t7, t8,
                    t9, t10, t11, t12;
                var book = 0, food = 0, film = 0, travel = 0;
                data.forEach(element => {
                    switch (element._id.month) {
                        case 1: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t1 = ['Tháng 1', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t1 = ['Tháng 1', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t1 = ['Tháng 1', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t1 = ['Tháng 1', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 2: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t2 = ['Tháng 2', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t2 = ['Tháng 2', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t2 = ['Tháng 2', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t2 = ['Tháng 2', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 3: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t3 = ['Tháng 3', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t3 = ['Tháng 3', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t3 = ['Tháng 3', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t3 = ['Tháng 3', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 4: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t4 = ['Tháng 4', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t4 = ['Tháng 4', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t4 = ['Tháng 4', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t4 = ['Tháng 4', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 5: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t5 = ['Tháng 5', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t5 = ['Tháng 5', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t5 = ['Tháng 5', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t5 = ['Tháng 5', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 6: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t6 = ['Tháng 6', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t6 = ['Tháng 6', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t6 = ['Tháng 6', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t6 = ['Tháng 6', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 7: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t7 = ['Tháng 7', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t7 = ['Tháng 7', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t7 = ['Tháng 7', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t7 = ['Tháng 7', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 8: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t8 = ['Tháng 8', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t8 = ['Tháng 8', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t8 = ['Tháng 8', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t8 = ['Tháng 8', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 9: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t9 = ['Tháng 9', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t9 = ['Tháng 9', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t9 = ['Tháng 9', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t9 = ['Tháng 9', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 10: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t10 = ['Tháng 10', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t10 = ['Tháng 10', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t10 = ['Tháng 10', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t10 = ['Tháng 10', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 11: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t11 = ['Tháng 11', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t11 = ['Tháng 11', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t11 = ['Tháng 11', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t11 = ['Tháng 11', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        case 12: {
                            switch (element._id.theme) {
                                case 'film': {
                                    film = element.count;
                                    t12 = ['Tháng 12', film, food, book, travel];
                                    break;
                                }
                                case 'food': {
                                    food = element.count;
                                    t12 = ['Tháng 12', film, food, book, travel];
                                    break;
                                }
                                case 'book': {
                                    book = element.count;
                                    t12 = ['Tháng 12', film, food, book, travel];
                                    break;
                                }
                                case 'trip': {
                                    travel = element.count;
                                    t12 = ['Tháng 12', film, food, book, travel];
                                    break;
                                }
                                default: { }
                            }
                            break;
                        }
                        default: { }

                    }

                })
                if (!t1) {
                    t1 = ['Tháng 1', 0, 0, 0, 0];
                }
                if (!t2) {
                    t2 = ['Tháng 2', 0, 0, 0, 0]
                }
                if (!t3) {
                    t3 = ['Tháng 3', 0, 0, 0, 0]
                }
                if (!t4) {
                    t4 = ['Tháng 4', 0, 0, 0, 0]
                }
                if (!t5) {
                    t5 = ['Tháng 5', 0, 0, 0, 0]
                }
                if (!t6) {
                    t6 = ['Tháng 6', 0, 0, 0, 0]
                }
                if (!t7) {
                    t7 = ['Tháng 7', 0, 0, 0, 0]
                }
                if (!t8) {
                    t8 = ['Tháng 8', 0, 0, 0, 0]
                }
                if (!t9) {
                    t9 = ['Tháng 9', 0, 0, 0, 0]
                }
                if (!t10) {
                    t10 = ['Tháng 10', 0, 0, 0, 0]
                }
                if (!t11) {
                    t11 = ['Tháng 11', 0, 0, 0, 0]
                }
                if (!12) {
                    t12 = ['Tháng 12', 0, 0, 0, 0]
                }
                var arrData = [
                    ['Month', 'Film', 'Food', 'Book', 'Travel'],
                    t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12];

                this.setState({
                    isLoadingGoogle: false,
                    dataGoogleChart: arrData
                })
            }
        });

    }
    render() {
        return (
            <div>

                {this.state.isLoadingGoogle ? <Loading /> :
                    <GoogleChart data={this.state.dataGoogleChart} />
                }
                {this.state.isLoadingLine ? <Loading /> :
                    <LineChart data={this.state.dataLineChart} />
                }

            </div>
        );
    }
}
export default Chart;
