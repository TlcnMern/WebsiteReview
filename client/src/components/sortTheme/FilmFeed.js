import React, { Component } from 'react';
import PostList from '../post/PostList';
import { sortPost } from '../../action/postAction';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Loading from '../template/Loading';
class FilmFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showKind:null,
            showForm:null,
            showRate:null,
            titleKind:null,
            titleForm:null,
            titleRate:null,
            anchorKind: null,
            anchorForm: null,
            anchorRate: null
        };
        sortPost({theme:'film'}).then((data) => {
            if (data.error)
                console.log(data.error);
            else {
                this.setState({ posts: data })
            }
        });
    }
    
    handleToggleKind = event => {
        this.setState({ anchorKind: event.currentTarget });
    };

    handleToggleForm = event => {
        this.setState({ anchorForm: event.currentTarget });
    };

    handleToggleRate = event => {
        this.setState({ anchorRate: event.currentTarget });
    };

    handleClose =(name,value) =>(e)=> {
        this.setState({ 
            anchorKind: null,
            anchorForm:null,
            anchorRate:null,
            [name]:value
        });

        if(name==='titleKind'){
            this.setState({
                showKind:e.nativeEvent.target.outerText||null
            })
        }
        if(name==='titleForm'){
            this.setState({
                showForm:e.nativeEvent.target.outerText||null
            })
        }
        if(name==='titleRate'){
            this.setState({
                showRate:e.nativeEvent.target.outerText||null
            })
        }
    };

    onSort=()=>{
        var temp=null;
        if(this.state.titleRate){
            if(this.state.titleRate==='highPointPating'){
                temp=1;
            }   
            else{
                temp=2
            }
        }
        else{
            temp=null;
        }
        var query={
            theme:'film',
            kind:this.state.titleKind,
            formality:this.state.titleForm,
            sortRate: temp
        }
        sortPost(query).then((data) => {
            if (data.error)
                console.log(data.error);
            else {
                this.setState({ posts: data })
            }
        });
    }

    render() {
        const { anchorKind,anchorForm,anchorRate } = this.state;
        const openKind = Boolean(anchorKind);
        const openForm = Boolean(anchorForm);
        const openRate = Boolean(anchorRate);
        return (
            <div className="boxContent">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-home">
                                <h4 style={{ margin: '20px', fontFamily: 'bold' }}> Cùng review phim hay mỗi ngày</h4>
                                <hr />
                                <div style={{ marginLeft: '0'}}  className="row">
                                    <div className="col-lg-3"><span>Thể loại</span></div>
                                    <div className="col-lg-3"><span>Hình thức</span></div>
                                    <div className="col-lg-4"><span>Đánh giá</span></div>
                                </div>
                                <div style={{ marginBottom: '40px'}} className="row">

                                    <div className="col-lg-3">
                                        <Button
                                            ref={anchorKind}
                                            aria-controls={openKind ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleToggleKind}
                                        >{this.state.showKind?this.state.showKind:<span>Tất cả</span>}
                                        
                                        
                                        <i style={{ marginLeft: '5px' }} className="fa fa-caret-down" aria-hidden="true"></i>

                                        </Button>
                                        <Popper style={{ zIndex: '10' }} open={openKind} anchorEl={anchorKind} role={undefined} transition disablePortal>
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener  onClickAway={this.handleClose('')}>
                                                            <MenuList  autoFocusItem={openKind} id="menu-list-grow">
                                                                <MenuItem onClick={this.handleClose('titleKind','')}>Tất cả</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleKind','action')}>Hành động</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleKind','swordplay')}>Cổ Trang </MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleKind','love')}>Tình cảm</MenuItem>
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </div>

                                    <div className="col-lg-3">
                                        <Button
                                            ref={anchorForm}
                                            aria-controls={openForm ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleToggleForm}
                                        >{this.state.showForm?this.state.showForm:<span>Tất cả</span>}

                                        <i style={{ marginLeft: '5px' }} className="fa fa-caret-down" aria-hidden="true"></i>
                                        </Button>
                                        <Popper style={{ zIndex: '10' }} open={openForm} anchorEl={anchorForm} role={undefined} transition disablePortal>
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener onClickAway={this.handleClose('')}>
                                                            <MenuList autoFocusItem={openForm} id="menu-list-grow">
                                                                <MenuItem onClick={this.handleClose('titleForm','')}>Tất cả</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleForm','odd')}>Phim lẻ</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleForm','series')}>Phim bộ</MenuItem>
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </div>

                                    <div className="col-lg-4">
                                        <Button
                                            ref={anchorKind}
                                            aria-controls={openRate ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={this.handleToggleRate}
                                        >{this.state.showRate?this.state.showRate:<span>Tất cả</span>}
                                        <i style={{ marginLeft: '5px' }} className="fa fa-caret-down" aria-hidden="true"></i>

                                        </Button>
                                        <Popper style={{ zIndex: '10' }} open={openRate} anchorEl={anchorRate} role={undefined} transition disablePortal>
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener onClickAway={this.handleClose('')}>
                                                            <MenuList autoFocusItem={openRate} id="menu-list-grow">
                                                                <MenuItem onClick={this.handleClose('titleRate','')}>Tất cả</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleRate','highPointPating')}>Đánh giá tốt nhất</MenuItem>
                                                                <MenuItem onClick={this.handleClose('titleRate','highVote')}>Quan tâm nhiều nhất</MenuItem>
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </div> 
                                        
                                    <Button onClick={this.onSort} variant="contained" color="primary">Lọc</Button>
                                </div>

                                <hr />
                                {this.state.posts.length>0?
                                <PostList posts={this.state.posts} />:
                                <Loading ></Loading>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default FilmFeed;