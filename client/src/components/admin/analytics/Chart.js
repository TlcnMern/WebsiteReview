import React, { Component } from 'react';

import GoogleChart from "./GoogleChart";
import LineChart from "./LineChart";

class Chart extends Component {

    render() {
        return (
            <div>
                <LineChart/>
                <GoogleChart/>
            </div>
        );
        // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
    }
}
export default Chart;
