import React, { Component } from 'react';
import '../../public/stylesheets/partials/processRating.css'
class ProcessRating extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            allStar:(this.props.data.oneStar+this.props.data.twoStar+this.props.data.threeStar+this.props.data.fourStar+this.props.data.fiveStar)||0
        };
        this.state.data.push({
            title:'5 sao',
            value:this.props.data.fiveStar
        },
        {
            title:'4 sao',
            value:this.props.data.fourStar
        },
        {
            title:'3 sao',
            value:this.props.data.threeStar
        },
        {
            title:'2 sao',
            value:this.props.data.twoStar
        }
        ,{
            title:'1 sao',
            value:this.props.data.oneStar
        })

    }
    render() {
        return <div className='chart'>
            {[
                <span key={1} className='label'>Biểu đồ đánh giá</span>,
                <div key={2}>
                    {this.state.data.map((d, i) =>
                        <Bar key={i}
                        title={d.title} value={d.value} allStar={this.state.allStar}/>
                    )}
                </div>
            ]}
        </div>;
    }
    
}

function Bar({ title, value, allStar }) {
    return (
        <div className='bar' >
            <div className='bar__label'>{title}</div>
            <div className='bar__mark' style={{ width: 4 * value }} />
            <div className="bar__digital" style={{ fontSize: '10px' }}>{value}/{allStar}</div>
        </div>
    );
}

export default ProcessRating;