import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
class LineChart extends Component {
      
    constructor(props) {
      super(props);
      this.state = {
        options: {
          chart: {
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'BIỂU ĐỒ THỂ HIỆN SỐ LƯỢNG NGƯỜI DÙNG TRONG NĂM THEO CÁC THÁNG',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
            }
        },
        series: [{
            data: this.props.data
        }],
      }
    }

    render() {

      return (
        

        <div style={{marginTop:'30px'}} id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
        </div>


      );
    }
  }
  export default LineChart;