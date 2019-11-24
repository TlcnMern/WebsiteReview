import React, {Component}from 'react';
import TopCare from './Top5-Care';

class CareList extends Component{
    render(){
        return(
            <div className="row">
                {/* {this.props.posts? this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                }): <div></div>
                } */}
                <TopCare/>
                <TopCare/>
                <TopCare/>
            </div>
        );
    }
}
export default CareList;