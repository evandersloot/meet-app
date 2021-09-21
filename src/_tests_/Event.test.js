import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;
    beforeAll(() => {
        event = mockData[1];
        EventWrapper = shallow(<Event event={event} />)
    });

    test('render event title', () => {
        expect(EventWrapper.find('.event-title')).toHaveLength(1);
    });

    test('render event location', () => {
        expect(EventWrapper.find('.event-location')).toHaveLength(1);
    });

    test('render event time', () => {
        expect(EventWrapper.find('.event-start')).toHaveLength(1);
    });

    test('render event start', () => {
        const eventStart = new Date(event.start.dateTime);
        expect(EventWrapper.find('.event-start').text()).toBe(eventStart.toString());
    });

    test('render more details button', () => {
        expect(EventWrapper.state('showDetails')).toBe(false);
        expect(EventWrapper.find('.details-button').text()).toBe('more details');
    });

    test('render details on more details button click', () => {
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.details-button').text()).toBe('less details');
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
    });

    test('render less details on less details button click', () => {
        EventWrapper.setState({showDetails: true});
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.find('.details-button').text()).toBe('more details');
        expect(EventWrapper.find('.event-details').text()).toBe('');
    });

});