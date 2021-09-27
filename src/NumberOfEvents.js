import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 24
    };

    handleChangeNumber = (event) => {
        const value = event.target.value;
        if (value < 1) {
            return this.setState({ 
                numberOfEvents: '' 
            });
        } else if (value > 24) {
            return this.setState({
                numberOfEvents: ''
            });
        } else {
            this.setState({
                numberOfEvents: value
            });
            this.props.updateEvents(value);
        }
    };


    render () {

        return (
            <div className="events-container">
                <label className="number-of-events">Number of Events: </label>
                <input 
                    type="number"   
                    className="change-number" 
                    value={this.state.numberOfEvents} 
                    onChange={this.handleChangeNumber} 
                />
            </div>
        )
    }
};

export default NumberOfEvents;