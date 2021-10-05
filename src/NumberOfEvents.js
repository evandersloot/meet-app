import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: ''
    };

   
    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            return this.setState({ 
                numberOfEvents: '',
                errorText: 'Enter a number between 1 and 32'
            });
        } else {
            this.setState({
                numberOfEvents: value,
                errorText: ''
            });
        this.props.updateEventCount(event.target.value);
        }
    };

    render () {
        const { numberOfEvents } = this.state;

        return (
            <div className="events-container">
                
                <label className="number-of-events">Number of Events: </label>
                <input 
                    type="number"   
                    className="change-number" 
                    value={numberOfEvents} 
                    onChange={this.handleInputChanged} 
                />
                <ErrorAlert text={this.state.errorText} />
            </div>
        )
    };
};

export default NumberOfEvents;