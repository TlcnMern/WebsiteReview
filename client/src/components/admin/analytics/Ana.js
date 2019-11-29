import React, { Component } from 'react';
import Chart from "./Chart";
import TopChart from "./TopChart";
import TopRating from './List5Rating';
import TopCare from './List5Care';
import TopUser from './List10User';
import { dispatchBodyAdmin } from '../../../action/userAction';
import { connect } from 'react-redux';

class Ana extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderChart: true,
            renderTop: false,
           
          };
      
        this.onClickChart = this.onClickChart.bind(this);
        this.onClickTop=this.onClickTop.bind(this);
        this.props.dispatchBodyAdmin();
    }
    onClickChart(){
        this.setState({renderChart:true});
        this.setState({renderTop:false});
    }
    onClickTop(){
        
        this.setState({renderChart:false});
        this.setState({renderTop:true});
    }
    renderChart() {
        if(this.state.renderChart)
        return (
            <div>
                <Chart />
            </div>
        );

    }
    renderTop(){
        if(this.state.renderTop)
        return(
            <div>
                <TopChart/>
            </div>
        );
    }
    renderBtn(){
        if(this.state.renderChart)
        return(
            <div>
                <div className="active-chart btnchart">
                    <button onClick={this.onClickChart}>
                        Chart
                    </button>
                </div>
                <div className="btnchart">
                    <button  onClick={this.onClickTop}>
                        Top Chart
                    </button>
                </div>
                
            </div>
            
        );
        if(this.state.renderTop)
        return(
            <div>
                <div className="btnchart">
                    <button onClick={this.onClickChart}>
                        Chart
                    </button>
                </div>
                <div className="active-chart btnchart">
                    <button  onClick={this.onClickTop}>
                        Top Chart
                    </button>
                </div>
                
            </div>
            
        );

    }
    render() {
        return (
            <div className="boxContentAdmin row" >
                {this.renderBtn()}                    
                <div className="clsChart-Cate">
                    {this.renderChart()}
                    {this.renderTop()}
                </div>


            </div>
        );
        // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
    }
}
const mapStateToProps = state => ({
    isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
});
export default connect(mapStateToProps, { dispatchBodyAdmin })(Ana);
