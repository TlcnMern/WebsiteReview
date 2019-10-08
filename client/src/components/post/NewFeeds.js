import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PostList from './PostList';
import {GetNewFeeds} from '../../action/postAction';

class NewFeeds extends Component{

    state={
        postList:[]
    }
    componentDidMount(){
        GetNewFeeds().then((data)=>{
            if(data.err)
                console.log(data.err);
            else
                this.setState({postList:data})
        });
    }

    render(){
        console.log(this.state.postList)
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <PostList posts={this.state.postList}/>
                    <ul>
                        <li><a href="#">&larr; Previous</a></li>
                        <li><a href="#">Next &rarr;</a></li>
                    </ul>
                </div>
                <div className="col-md-4">

                </div>
            </div>
        </div>
        );
    }
}


export default NewFeeds;