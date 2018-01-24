import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar'; 
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          searchResults: [],
          playlistName: "New Playlist",
          playlistTracks: []
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.removeTrackHelper = this.removeTrackHelper.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }
    
  updatePlaylistName(name) {
      this.setState({
        playlistName: name.target.value
      });
  }
    
  addTrack(track) {
     this.state.playlistTracks.forEach(function(playlistTrack) {
        if (track.id === playlistTrack.id) {
            this.setState({
                playlistTracks: this.state.playlistTracks 
            });
        } else {
            this.state.playlistTracks[this.state.playlistTracks.length] = track;
            this.setState({
               playlistTracks: this.state.playlistTracks 
            });
        }
     });
  }
    
  removeTrackHelper(tracksArray, element) {
      var trackContainer = tracksArray.filter(function(track) {
          return track.id !== element.id;
      });
      return trackContainer;
  }
    
  removeTrack(track) {
      var afterRemoveATrack = this.removeTrackHelper(this.state.playlistTracks, track);
      this.setState({
        playlistTracks: afterRemoveATrack
      });
  }
    
  savePlaylist() {
      var trackURIs = this.state.playlistTracks.map(function(track){
            return track.uri; 
      });
      return trackURIs;
  }
    
  search(term) {
      Spotify.search(term).then(tracks => {
          this.setState({
              searchResults: tracks
          });
      });
  }
        
  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
             {/* Add a SearchBar component */}
             <SearchBar onSearch={this.search}/>
             <div className="App-playlist"> 
             {/* Add a SearchResult component */}
             <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
             {/* Add a Playlist component */}
             <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
