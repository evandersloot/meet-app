import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    };

   
    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 0 || value > 32) {
          return this.setState({  
            numberOfEvents: ''
          });
        } else {
          this.setState({ 
            numberOfEvents: value,
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
            </div>
        )
    };
};

export default NumberOfEvents;