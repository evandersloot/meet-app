Feature: Show/Hide an event’s details

Scenario: An event element is collapsed by default
Given the user is on the main page.
When the user wants to see a list of events.
Then the event element is collapsed by default.

Scenario: User can expand an event to see its details
Given the user is looking through an events list.
When the user finds an event that interests them.
Then the user can expand that event to see its details.	

Scenario: User can collapse an event to hide its details.
Given the user is looking at an event’s details.
When the user wants to look at other events.
Then the user can collapse the event to hide its details.
