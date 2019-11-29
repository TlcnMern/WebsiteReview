import React, { Component } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'font-awesome/css/font-awesome.min.css';
// import "../../../public/stylesheets/partials/style.css"
// import "../../../public/stylesheets/partials/styleAdmin.css"
import { Chart } from "react-google-charts";
class GoogleChart extends Component {
    render() {
        return (
            <div className="row mt-5">  
                <div className="col-md-12">
                    <h2 className="text-left">BIỂU ĐỒ THỂ HIỆN SỐ LƯỢNG BÀI VIẾT THEO CHỦ ĐỀ THEO THÁNG</h2>
                    <div className="card mt-3">
                        <div className="card-body"> 
                            <Chart
                                height={'500px'}
                                width={'100%'}
                                chartType="Bar"
                                loader={<div>Loading First Chart</div>}
                                data={[
                                    ['Month', 'Film', 'Food','Book','Travel'],
                                    ['Tháng 1', 1000, 400, 200,390],
                                    ['Tháng 2', 1170, 460, 250,599],
                                    ['Tháng 3', 660, 1120, 300,786],
                                    ['Tháng 4', 1030, 540, 350,222],
                                    ['Tháng 5', 1030, 540, 350,999],
                                    ['Tháng 6', 930, 490, 260,1000],
                                    ['Tháng 7', 1000, 400, 200,390],
                                    ['Tháng 8', 1170, 460, 250,599],
                                    ['Tháng 9', 660, 1120, 300,786],
                                    ['Tháng 10', 1030, 540, 350,222],
                                    ['Tháng 11', 1030, 540, 350,999],
                                    ['Tháng 12', 930, 490, 260,1000],
                                ]}
                                options={{
                                    // Material design options
                                    chart: {
                                        title: 'Category in yeart',
                                        subtitle: 'Film, Food, Book, Travel, and Profit: Current Year',
                                    },
                                }}
                                // For tests
                                rootProps={{ 'data-testid': '2' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 export default GoogleChart;