# meet-app

Objective
* To build a serverless, progressive web application (PWA) with React using a test-driven
  development (TDD) technique. The application uses the Google Calendar API to fetch
  upcoming events.
  
Context
* Serverless and PWAs have grown in popularity over the last few years, and they’re both
  considered to be the future of web development. By combining these two concepts, the app
  will not only work as a normal web application, but it will also reap the benefits of both
  serverless architecture and PWAs:
  *Serverless: No backend maintenance, easy to scale, always available, no cost for idle
   time.
  *PWAs: Instant loading, offline support, push notifications, “add to home screen” prompt,
   responsive design, and cross-platform compatibility
   
 Features and Requirements
 *Key Features
  1. Filter events by city.
  2. Show/hide event details.
  3. Specify number of events.
  4. Use the app when offline.
  5. Add an app shortcut to the home screen.
  6. View a chart showing the number of upcoming events by city.
  
User Stories

Feature 1: Filter events by city.
As a user, I want to be able to filter events based on my location so I can decide what event I want to attend.
*Scenario 1: When a user hasn’t searched for a city, show upcoming events from all cities.
  *Given the user hasn’t searched for any city.
  *When the user opens the app.
  *Then the user should see a list of all upcoming events.

*Scenario 2: User should see a list of suggestions when they search for a city.
  *Given the main page is open.
  *When the user starts typing in the city textbox.
  *Then the user should see a list of cities (suggestions) that match what they’ve typed.

*Scenario 3: User can select a city from the suggested list.
  *Given the user was typing a city in the textbox, and the suggested list is showing.
  *When the user selects a city from the list.
  *Then their city should be changed to that city and the user should receive a list of 	upcoming events for that city.

Feature 2: Show/Hide an event’s details
As a user, I should be able to show or hide event details so I can see more or less event details when I choose.
*Scenario 1: An event element is collapsed by default
  *Given the user is on the main page.
  *When the user wants to see a list of events.
  *Then the event element is collapsed by default.

*Scenario 2: User can expand an event to see its details
  *Given the user is looking through an events list.
  *When the user finds an event that interests them.
  *Then the user can expand that event to see its details.	

*Scenario 3: User can collapse an event to hide its details.
  *Given the user is looking at an event’s details.
  *When the user wants to look at other events.
  *Then the user can collapse the event to hide its details.

Feature 3: Specify Number of Events
As a user, I should be able to specify the number of events I want to scroll through while looking so I don’t have to go to another page.
*Scenario 1: When user hasn’t specified a number, 32 is the default number.
  *Given the user opens the application.
  *When the user sees the list of events.
  *Then the default number of events is 32.

*Scenario 2: User can change the number of events they want to see.
  *Given: The default number of events is 32.
  *When: The user wants to see more/less events in their list.
  *Then: The user can change the number of events they want to see.

Feature 4: Use the App When Offline
As a user, I want to be able to use the app when I don’t have cell phone coverage.
*Scenario 1: Show cached data when there’s no internet connection.
  *Given the user has no internet connection.
  *When the user still wants to look at the app list of events.
  *Then the app should show cached data for the user to view the last list they looked at.

*Scenario 2: Show error when user changes the settings (city, time range)
  *Given the user has no internet connection, but has cached data.
  *When the user changes the search criteria.
  *Then the app shows an error, due to no internet connection.

Feature 5: Data Visualization
As a user, I want to know how many events are coming to each city by easily viewing a chart.
*Scenario 1: Show a chart with the number of upcoming events in each city.
  *Given the user wants to see upcoming events in different locations.
  *When the user clicks on a location on a map.
  *Then the user sees a chart with upcoming events for that location.

Technical Requirements
* The app must be a React application.
* The app must be built using the TDD technique.
* The app must use the Google Calendar API and OAuth2 authentication flow.
* The app must use serverless functions (AWS lambda is preferred) for the authorization
  server instead of using a traditional server.
* The app’s code must be hosted in a Git repository on GitHub.
* The app must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera,
  as well as on IE11.
* The app must display well on all screen sizes (including mobile and tablet) widths of
  1920px and 320px.
* The app must pass Lighthouse’s PWA checklist.
* The app must work offline or in slow network conditions with the help of a service
  worker.
* Users may be able to install the app on desktop and add the app to their home screen
  on mobile.
* The app must be deployed on GitHub Pages.
* The API call must use React axios and async/await.
* The app must implement an alert system using an OOP approach to show information to
  the user.
* The app must make use of data visualization (recharts preferred).
* The app must be covered by tests with a coverage rate >= 90%.
* The app must be monitored using an online monitoring tool.
