import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {   
    state = {
        locations: this.props.locations,
        query: '',
        suggestions: [],
        showSuggestions: false,
        inforText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if(value === '') {
            this.setState({
                suggestions: [],
                query: '',
                showSuggestions: false
            })
        };
        if(suggestions.length === 0) {
            this.setState({
                suggestions: [],
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city.'
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false
        });
        this.props.updateEvents(suggestion, 0);
    }

    render() {
        return (
           <div className="CitySearch">
               <InfoAlert text={this.state.infoText} />
               <label>Search your city: </label>
               <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
                    {this.state.suggestions.map((suggestion) => (
                        <li 
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
           </div>
        );
    }
}

export default CitySearch;