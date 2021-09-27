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
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events :
      events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents
        });
    });
  }

  updateEventCount = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount 
    });
    this.updateEvents(currentLocation, eventCount);
  }

  render() {
    
    return (
      <div className="App">
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <NumberOfEvents 
          numberOfEvents={this.state.numberOfEvents} 
          updateEvents={this.updateEvents} 
        />
        <EventList 
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;
