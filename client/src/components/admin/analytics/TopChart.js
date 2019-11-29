import React, { Component } from 'react';
import Select from 'react-select';
import Loading from '../../template/Loading';
import ViewPostCare from './ViewPostCare';
import ViewUserRanking from './ViewUserRanking';

import { getPostPopularFollowMonth, getPostHighRateFollowMonth , getUserRaking} from '../../../action/adminAction';

class TopChart extends Component {

    state = {
        isLoadingCare: true,
        isLoadingRating: true,
        isLoadingUser:true,
        PostsCare: [],
        PostsRating: [],
        UserRanking:[]
    }

    componentDidMount() {
        getPostPopularFollowMonth(11).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                this.setState({
                    isLoadingCare: false,
                    PostsCare: data
                })
            }
        });

        getPostHighRateFollowMonth(11).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                this.setState({
                    isLoadingRating: false,
                    PostsRating: data
                })
            }
        });

        getUserRaking(11).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                this.setState({
                    isLoadingUser: false,
                    UserRanking: data
                })
            }
        });

    };

    onChangeMonth = (event) => {
        getPostPopularFollowMonth(event.value).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                console.log(data)
                this.setState({
                    PostsCare: data
                })
            }
        })

        getPostHighRateFollowMonth(event.value).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                this.setState({
                    isLoadingRating: false,
                    PostsRating: data
                })
            }
        });

        getUserRaking(event.value).then(data => {
            if (data.error) {
                console.log(data);
            }
            else {
                console.log(data)
                this.setState({
                    isLoadingUser: false,
                    UserRanking: data
                })
            }
        });
    }

    render() {
        const months = [
            { label: "Tháng 1", value: 1 },
            { label: "Tháng 2", value: 2 },
            { label: "Tháng 3", value: 3 },
            { label: "Tháng 4", value: 4 },
            { label: "Tháng 5", value: 5 },
            { label: "Tháng 6", value: 6 },
            { label: "Tháng 7", value: 7 },
            { label: "Tháng 8", value: 9 },
            { label: "Tháng 9", value: 9 },
            { label: "Tháng 10", value: 10 },
            { label: "Tháng 11", value: 11 },
            { label: "Tháng 12", value: 12 },
        ];
        const customStyles = {
            menu: (provided, state) => ({
                ...provided,
                width: state.selectProps.width,
                borderBottom: '1px dotted pink',
                color: state.selectProps.menuColor,
                padding: 20,
            }),

            control: (_, { selectProps: { width } }) => ({
                width: width
            }),

            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        };

        return (
            <div className="row" >
                <span id="bcar-Title">BẢNG XẾP HẠNG BÀI VIẾT</span>
                <div id="bcar-choosemonth">Chọn tháng để xem:<br />
                    <Select onChange={this.onChangeMonth} className="selectMonth" style={customStyles} options={months} />
                </div>
                <div className="anaTop fadeInDown" >
                    <div id="top5care">
                        <span id="anaTop-Title">TOP 5 BÀI VIẾT ĐƯỢC QUAN TÂM NHẤT THÁNG</span><br />
                        {
                            this.state.isLoadingCare ? <Loading /> :
                                (this.state.PostsCare.length > 0 ?
                                    (this.state.PostsCare.map((item, i) => {
                                        return <ViewPostCare key={i+Date} post={item} />

                                    })) :
                                    <span>Không tìm thấy kết quả</span>
                                )
                        }
                    </div>
                    <div id="top5rating">
                        <span id="anaTop-Title">TOP 5 BÀI VIẾT ĐƯỢC ĐÁNH GIÁ CAO NHẤT THÁNG</span>
                        {
                            this.state.isLoadingRating ? <Loading /> :
                                (this.state.PostsRating.length > 0 ?
                                    (this.state.PostsRating.map((item, i) => {
                                        return <ViewPostCare key={i + Date} post={item} />

                                    })) :
                                    <span>Không tìm thấy kết quả</span>
                                )
                        }
                    </div>
                    <div id="top10user">
                        <span id="anaTop-Title">TOP 10 NGƯỜI DÙNG CÓ BÀI VIẾT NHIỀU NHẤT THÁNG</span>
                        {
                            this.state.isLoadingUser ? <Loading /> :
                                (this.state.UserRanking.length > 0 ?
                                    (this.state.UserRanking.map((item, i) => {
                                        return <ViewUserRanking key={i + Date} user={item} />

                                    })) :
                                    <span>Không tìm thấy kết quả</span>
                                )
                        }
                    </div>
                </div>

            </div>
        );
    }
}
export default TopChart;
