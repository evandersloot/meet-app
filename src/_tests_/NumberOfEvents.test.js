import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render number of events field', () => {
        expect(NumberOfEventsWrapper.find('.events-container')).toHaveLength(1);
    });

    test('render default 32 events', () => {
        expect(NumberOfEventsWrapper.find('.change-number')).toHaveLength(1);
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(32);
    });

    test('render change of state when text input is completed', () => {
        NumberOfEventsWrapper.setState({ eventsNumber: 32 });
        const eventsInput = { target: { value: 16 }};
        NumberOfEventsWrapper.find('.change-number').simulate('change', eventsInput);
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(16);
    });
});
