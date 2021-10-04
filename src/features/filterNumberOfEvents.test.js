import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/filterNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    const NumberOfEventsWrapper = mount(<NumberOfEvents updateEventCount={() => {}}/>);
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the user opens the application', () => {
            AppWrapper = mount(<App />);
        });

        when('the user sees the list of events', () => {

        });

        then('the default number of events is 32', () => {
            expect(AppWrapper.state('events').length).toBe(mockData.length);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('the default number of events is 32', () => {
            AppWrapper = mount(<App />);
        });

        when('the user wants to see more/less events in their list', () => {
            NumberOfEventsWrapper.find('.change-number').simulate('change', { target: { value: 12 } });
        });

        then('the user can change the number of events they want to see', () => {
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(12);
        });
    });
});