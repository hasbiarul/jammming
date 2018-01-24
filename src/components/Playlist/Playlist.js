import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.js';

export class Playlist extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event);
    }
    
    render() {
        return (<div className="Playlist">
                  <input value={'New Playlist'} />
                   {/* Add a TrackList component */}
                   <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
                </div>
        );
    }
}