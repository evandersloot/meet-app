import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { OfflineAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import './App.css';
import './nprogress.css';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    offLineText: '',
    showWelcomeScreen: undefined
  }

  componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (checkToken(accessToken)).error ? false : true;
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) =>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

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
        <div className='data-vis-wrapper'>
          <ResponsiveContainer height={400} >
            <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
              >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#0000ff" />
            </ScatterChart>
            <EventGenre events={events} />
          </ResponsiveContainer>
        </div>
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
