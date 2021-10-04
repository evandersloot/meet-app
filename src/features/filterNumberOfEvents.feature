Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the user opens the application
When the user sees the list of events
Then the default number of events is 32

Scenario: User can change the number of events they want to see
Given the default number of events is 32
When the user wants to see more/less events in their list
Then the user can change the number of events they want to see
