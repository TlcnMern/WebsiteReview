import React, { Component } from 'react';
import { Chart } from "react-google-charts";
class GoogleChart extends Component {
    render() {
        console.log(this.props.data)
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
                                data={this.props.data}
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