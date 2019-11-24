import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import DonutChartCate from "./DonutChart";
import GoogleChart from "./GoogleChart";
import Select from 'react-select';
import TopRating from './List5Rating'
import TopCare from './List5Care'
import TopUser from './List10User'
class Ana extends Component {
    renderDonutChartCate(){
        return(
            <div>
                <DonutChartCate/>
            </div>
        );
        
    }
    renderGoogleChartCate(){
        return(
            <div>
                <GoogleChart/>
            </div>
        );
        
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
          
            control: (_, { selectProps: { width }}) => ({
              width: width
            }),
          
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
          
              return { ...provided, opacity, transition };
            }
          }          
        return (
            <div className="boxContentAdmin row" >
                <div className="boxContentAdmin-left row">
                    <div className="clsChart-Cate" style={{width:'100%',height:'100%'}}>
                        <h2 className="text-left">Biểu đồ biễu diễn lượng truy cập vào mỗi chủ đề</h2>
                        {this.renderDonutChartCate()}
                    </div>
                    <div className="clsChart-Cate">
                        {this.renderGoogleChartCate()}
                    </div>
                    
                </div>
                <div className="row boxContentAdmin-right ">
                    <span id="bcar-Title">BẢNG XẾP HẠNG BÀI VIẾT</span>
                        <div id="bcar-choosemonth">Chọn tháng để xem:<br/> <Select className="selectMonth" style={customStyles} options={ months } /></div>
                        <div className="anaTop fadeInDown" >
                        <div id="top5care">
                            <span id="anaTop-Title">TOP 5 BÀI VIẾT ĐƯỢC QUAN TÂM NHẤT THÁNG</span><br/>
                            <TopCare/>
                        </div>
                        <div id="top5rating">
                            <span id="anaTop-Title">TOP 5 BÀI VIẾT ĐƯỢC ĐÁNH GIÁ CAO NHẤT THÁNG</span>
                            <TopRating/>
                        </div>
                        <div id="top10user">
                            <span id="anaTop-Title">TOP 10 NGƯỜI DÙNG CÓ BÀI VIẾT NHIỀU NHẤT THÁNG</span>
                            <TopUser/>
                        </div>
                        </div>
                        
                        
                </div>
             
            </div>
        );
        // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
    }
}

export default Ana;
