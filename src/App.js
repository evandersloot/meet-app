import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';
import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 24
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents), 
          locations: extractLocations(events) 
        });
      }
    })
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    let locationEvents;
    getEvents().then((events) => {
      if (location === 'all' && eventCount === 0) {
        locationEvents = events;
      } else if (location !== 'all' && eventCount === 0) {
        locationEvents = events.filter((event) => event.location === location);
      } else if (location === '' && eventCount > 0) {
        locationEvents = events.slice(0, eventCount);
      } else if (location === '' && eventCount === '') {
        locationEvents = events;
      }
      this.setState({
        events: locationEvents,
        numberOfEvents: eventCount
      });
    });
  };

  updateEventCount = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount
    });
    const { currentLocation } = this.state
    this.updateEvents(currentLocation, eventCount);
  };

  render() {
    const { locations, events, numberOfEvents } = this.state;
    
    return (
      <div className="App">
        <CitySearch 
          locations={locations} 
          updateEvents={this.updateEvents}
          
        />
        <NumberOfEvents 
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}  
        />
        <EventList 
          events={events}
        />
      </div>
    );
  }
}

export default App;
