import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import EventList from '../EventList';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    let EventlistWrapper;
    let EventWrapper;
    let AppWrapper;
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the user is on the main page.', () => {
            EventlistWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('the user wants to see a list of events.', () => {
            AppWrapper = mount(<App />);
        });

        then('the event element is collapsed by default.', () => {
            expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the user is looking through an events list.', () => {
            AppWrapper = mount(<App />);
            EventlistWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('the user finds an event that interests them.', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the user can expand that event to see its details.', () => {
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('the user is looking at an event’s details.', () => {
            AppWrapper = mount(<App />);
            EventlistWrapper = mount(<EventList events={mockData} />);
            EventWrapper = mount(<Event event={mockData[0]} />);
            EventWrapper.find('.details-btn').simulate('click');
            EventWrapper.find('.event-details');
        });

        when('the user wants to look at other events.', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the user can collapse the event to hide its details.', () => {
            expect(EventWrapper.find('event-details')).toHaveLength(0);
        });
    });
});