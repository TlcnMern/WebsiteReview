import React from 'react';
import YouTube from 'react-youtube';

class Example extends React.Component {
    state = {
        youtubeId: this.props.youtubeId
    }
    render() {
        const opts = {
            height: '390',
            width: '640'
        };

        return (
            <YouTube
                videoId={this.state.youtubeId}
                opts={opts}
                onReady={this._onReady}
            />
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default Example