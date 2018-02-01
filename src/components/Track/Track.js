import React from 'react';
import './Track.css';

export class Track extends React.Component {
    
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    renderAction() {
        if (this.props.isRemoval) {
            return '-';
        } else {
            return '+';
        }
    }
    
    render() {
        return (
            <div className="track-container">
                <div className="Track">
                    <div className="Track-information">
                            <h3>{this.props.track.name}</h3>
                            <p>{this.props.track.artist}</p>
                            <p>{this.props.track.album}</p>
                    </div>
                    <a className="Track-action" onClick={this.renderAction() === '+' ? this.addTrack : this.removeTrack} > {this.renderAction()} </a>
                </div>

                {/* Include preview samples for each track. I'm using this widget and just inject the particular track uri, instead of retrieve preview_url. Hope what I'm doing is just fine :) */}

                <iframe src={"https://open.spotify.com/embed?uri=" + this.props.track.uri} width="300" height="80" frameBorder="0" allowtransparency="true"></iframe>
            </div>
        );
    }
}