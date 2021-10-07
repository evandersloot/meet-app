import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import './App.css';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    offLineText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events.slice(0, this.state.numberOfEvents), 
          locations: extractLocations(events) 
        });    
      }
    });
      if(!navigator.onLine) {
        this.setState({
          offLineText: 'No connection. You may be viewing out of date events. For a current schedule, connect to the internet.',
        });
      } else {
        this.setState({
          offLineText: '',
        });
      }
    }
  }


  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents),
        currentLocation: location
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
    if (this.state.showWelcomeScreen === undefined) 
      return <div className='App' />
    const { locations, events, numberOfEvents, showWelcomeScreen } = this.state;
    
    return (
      <div className="App">
        <OfflineAlert text={this.state.offLineText} />
        <CitySearch 
          locations={locations} 
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents  
          numberOfEvents={numberOfEvents} 
          updateEventCount={this.updateEventCount}
        />
        <EventList 
          events={events}
        />
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} getAccessToken={() => {
          getAccessToken()
        }} />
      </div>
    );
  }
}

export default App;
