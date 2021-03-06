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
          playlistTracks: [],
          addRemoveTracks: []
      };
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.removeTrackHelper = this.removeTrackHelper.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.trackFilterHelper = this.trackFilterHelper.bind(this);
      this.playlistTrackFilterHelper = this.playlistTrackFilterHelper.bind(this);
  }
    
  updatePlaylistName(name) {
      this.setState({
        playlistName: name.target.value
      });
  }
    
  addTrack(track) {
     if (this.state.playlistTracks.length === 0) {
         this.state.playlistTracks.push(track);
         this.setState({ 
            playlistTracks: this.state.playlistTracks 
         });
     } else {
        for (var i = 0; i < this.state.playlistTracks.length; i++) {
            if (track.id === this.state.playlistTracks[i].id) {
                console.log("Track already inside playlist.");
                return;
            } 
        }
        this.state.playlistTracks.push(track);
        this.setState({
            playlistTracks: this.state.playlistTracks
        });
     }
     this.trackFilterHelper(); /* <-- Invoked. */
  }
    
  removeTrackHelper(tracksArray, element) {
      var trackContainer = tracksArray.filter(function(track) {
          return track.id !== element.id;
      });
      return trackContainer;
  }
  
  /* Only display songs not currently present in the playlist in the search results. */
  // Hope what I'm doing is just fine. 
  trackFilterHelper() {
      var _this = this;
      var container = this.state.searchResults.filter(function(track) {
            for (var i = 0; i < _this.state.playlistTracks.length; i++) {
                if (track.id === _this.state.playlistTracks[i].id) {
                    return;
                }
            }
            return track;  
      });
      this.setState({
         searchResults: container
      });
  }
  
  /* Return track inside playlist to search result track, whenever '-' button get clicked. */
  // Hope what I'm doing is just fine.
  playlistTrackFilterHelper(trackRemoved) {
      this.state.searchResults.unshift(trackRemoved);
      this.setState({
          searchResults: this.state.searchResults
      });
  }
    
  removeTrack(track) {
      var afterRemoveATrack = this.removeTrackHelper(this.state.playlistTracks, track);
      this.setState({
        playlistTracks: afterRemoveATrack
      });
      this.playlistTrackFilterHelper(track); /* <-- Invoked. */
  }
    
  savePlaylist() {
      var trackURIs = this.state.playlistTracks.map(function(track){
            return track.uri; 
      });
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
          this.setState({
            playlistName: "New Playlist",
            playlistTracks: []
          });
      });
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
             <SearchBar onSearch={this.search} onCheckPlaylist={this.getAllPlaylist} onBlockTrack={this.blockedTrackInSearchResult}/>
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
