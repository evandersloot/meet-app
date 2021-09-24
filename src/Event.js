import React, { Component } from "react";

class Event extends Component {
    state = {
        showDetails: false 
    };


showDetails() {
    if(this.state.showDetails === false) {
        this.setState({showDetails: true})
    } else {
        this.setState({showDetails: false})
    }
};

buttonText() {
    if(this.state.showDetails === false) {
        return "more details"
    } else { 
        return "less details"
    }
};

eventDetails(event) {
     if(this.state.showDetails === false) {
         return ''
     } else {
         return event.description
     }
}


    render() {

        const { event } = this.props;

        return  (
        <div className="event">
            <h1 className="event-title">{event.summary}</h1>
            <h2 className="event-location">{event.location}</h2>
            <p className="event-start">{new Date(event.start.dateTime).toString()}</p>
            <p className="event-details">{this.eventDetails(event)}</p>
            <button className="details-btn" 
                onClick={() => {
                this.showDetails(event)}}>{this.buttonText()}
            </button>
        </div>
        
        )
    }
}

export default Event;