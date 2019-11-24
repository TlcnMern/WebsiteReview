import React, {Component}from 'react';
import TopRating from './Top5-Rating';

class RatingList extends Component{
    render(){
        return(
            <div className="row">
                {/* {this.props.posts? this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                }): <div></div>
                } */}
                <TopRating/>
                <TopRating/>
                <TopRating/>
            </div>
        );
    }
}
export default RatingList;