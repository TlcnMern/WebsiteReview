import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import DonutChart from 'react-donut-chart';
class DonutChartCate extends Component {
    
    render() {
        var color = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3'];
        return (
            <div >
                <DonutChart
                className="fadeIn"
                data={[{
                        label: 'Trip',
                        value: 25
                    },
                    {
                        label: 'Film',
                        value: 75,
                    },
                    {
                        label: 'Book',
                        value: 75,
                    },
                    {
                        label: 'Travel',
                        value: 75,
                    },
                    ]} 
                colors={color}
                strokeColor='#ffffff'/>
            </div>
        );
    }
}



export default DonutChartCate;
