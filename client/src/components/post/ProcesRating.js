import React, { Component } from 'react';
import '../../public/stylesheets/partials/processRating.css'
class ProcessRating extends Component {
    render() {
        const data = this.props.data;
        return <div className='chart'>
            {[
                <span key={1} className='label'>Biểu đồ đánh giá</span>,
                <div key={2}>
                    {data.map((d, i) =>
                        <Bar key={i}
                        title={d.title} value={d.value}/>
                    )}
                </div>
            ]}
        </div>;
    }
}

function Bar({ title, value }) {
    return (
        <div className='bar' >
            <div className='bar__label'>{title}</div>
            <div className='bar__mark' style={{ width: 4 * value }} />
            <div className="bar__digital" style={{ fontSize: '10px' }}>{value}/50</div>
        </div>
    );
}

export default ProcessRating;