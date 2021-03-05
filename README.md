# Table of Content
# Chronos

##description:

My challenge was to create the service called chronos that helps organize meetings, tasks for the day/month/year,and events.

###**During the challenge I implemented**:<br/>

- User access rights
- User Authentication
- User Registration
- User Login, Logout options
- Product Page
- Functionality to reset password and verify user email
- CRUD operations for Calendar, Events, Users
- Event types: arrangement, reminder, task


##**Database tables**:<br/>

- Users<br/>
- Calendars<br/>
- Calendars Participants<br/>
- Events<br/>
- Participants<br/>
- User Access Tokens<br/>

#Future plans
- Functionality to hide calendars
- Invite friends to see event info, calendar info
- User Management Dashboard

#installation:
```md
> npm install
> mysql -u root
> CREATE USER kbarinova@localhost IDENTIFIED BY 'swagswag69-69';
> GRANT ALL PRIVILEGES ON * . * TO kbarinova@localhost;

```
#usage:
```md
> node index
> npm start
```

#screenshots
![Alt text](/src/images/img1.png?raw=true "Product Page Home")
![Alt text](/src/images/img2.png?raw=true "Product Page Services")
![Alt text](/src/images/img3.png?raw=true "Product Page Products")
![Alt text](/src/images/img4.png?raw=true "Product Page Prices")
![Alt text](/src/images/img5.png?raw=true "Optional Footer")
![Alt text](/src/images/img6.png?raw=true "Login Page")
![Alt text](/src/images/img7.png?raw=true "Calendar Account Page")
![Alt text](/src/images/img8.png?raw=true "New Event Form")


#dependencies:<br/>
```md
    "@fullcalendar/core": "^5.5.1",
    "@fullcalendar/daygrid": "^5.5.0",
    "@fullcalendar/interaction": "^5.5.0",
    "@fullcalendar/react": "^5.5.0",
    "@fullcalendar/timegrid": "^5.5.1",
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.5",
    "@testing-library/user-event": "^12.6.3",
    "axios": "^0.21.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-icons": "^4.2.0",
    "react-redux": "^7.2.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.2",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.2.1",
    "web-vitals": "^1.1.0"
```
##licenses:<br/>
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

##Author:<br/>
**Karina Barinova** :bowtie: 
