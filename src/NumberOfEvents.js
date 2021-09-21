import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        eventsNumber: 32
    };

    handleChangeNumber = (event) => {
        const value = event.target.value;
        this.setState({ eventsNumber: value });
    };

    render () {
        const {eventsNumber} = this.state;

        return (
            <div className="events-container">
                <label className="number-of-events">Events: </label>
                <input type="number" className="change-number" value={eventsNumber} onChange={this.handleChangeNumber} />
            </div>
        );
    }
};

export default NumberOfEvents;