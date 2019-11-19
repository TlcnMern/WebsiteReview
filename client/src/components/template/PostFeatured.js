import React, { Component } from 'react';
import { GetPostFeatured } from '../../action/postAction';
import ViewPostFeatured from './ViewPostFeatured';

class PostFeatured extends Component {

    state={
        listPost:[]||null
    }

    componentDidMount(){
        GetPostFeatured().then(data=>{
            if(data.error){
                console.log(data);
            }
            else{
                this.setState({
                    listPost:data
                })
            }
        })
    }

    render() {
        return(
            <div style={{overflow:'auto', maxHeight:'450px'}}>
                {this.state.listPost? this.state.listPost.map((item, i) => {
                    return <ViewPostFeatured post={item} key={i}/>
                }): <div></div>
                }
            </div>
        );
            
    }
}


export default PostFeatured
