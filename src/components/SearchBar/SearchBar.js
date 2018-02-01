import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.triggerInputWithEnter = this.triggerInputWithEnter.bind(this);
    }
    
    search(event) {
        this.props.onSearch(this.state.term);
        event.preventDefault();
    }
    
    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }
    
    /* ----- Pressing enter triggers a search ----- */
    // ----- Hope what I'm doing is just fine ----- :)
    
    triggerInputWithEnter(event) {
        var keyPressedType = event.key;
        if (keyPressedType === "Enter") {
            this.props.onSearch(this.state.term);
            event.preventDefault();
        } else return;
    }
    
    render() {
        return (<div className="SearchBar">
                  <input id="searchInput" placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.triggerInputWithEnter}/>
                  <a onClick={this.search}>SEARCH</a>
                </div>
        );
    }
}
                