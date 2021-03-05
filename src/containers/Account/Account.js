import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    AccountContainer,
    ParentCalendarContainer,
    ErrorContainer
} from './Account.elements'
import { Calendar, Modal } from '../../components'
import SideBar from './SideBar';
import SingleCalendar from './SingleCalendar'
import EventView from './EventView';
import CalendarView from './CalendarView'
import EventEditView from './EventEditView'
import CalendarEditView from './CalendarEditView'

class Account extends Component {
    _isMounted = false;

    state = {
        calendars: [],
        creatingMode: false,
        events: [],
        calendarsUpdated: false,
        eventsUpdated: false,
        loadNewCalendars: false,
        dateClickedDate: '',
        eventEditInfo: false,
        editingEvent: null,
        calendarEditInfo: false,
        editingCalendar: null,
        error: false
    }

    componentDidUpdate() {
        if (this.state.loadNewCalendars) {
            this._isMounted = true
            this.loadData();
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.loadData()
    }

    loadData() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get('/calendars/', config)
            .then(res => {
                if (this._isMounted) {
                    this.setState({ 
                        calendars: res.data, 
                        loadNewCalendars: false, 
                        dateClickedDate: '', 
                        editingEvent: null, 
                        editingCalendar: null,
                        eventEditInfo: false,
                        calendarEditInfo: false,
                        error: false 
                    })
                }
            })
            .catch(e => this.setState({...this.state, error: true}))
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    createEventHandler = () => {
        this.setState({ 
            creatingMode: true, 
            eventsUpdated: true, 
            calendarsUpdated: false, 
            eventEditInfo: false, 
            calendarEditInfo: false,
        })
    }
    
    editEventHandler = (id) => {
        this.setState({ 
            creatingMode: true, 
            editingEvent: id, 
            editingCalendar: null,
            eventEditInfo: true, 
            eventsUpdated: false, 
            calendarsUpdated: false, 
            calendarEditInfo: false 
        })
    }
    editCalendarHandler = (id) => {
        this.setState({ 
            creatingMode: true, 
            editingCalendar: id,
            editingEvent: null, 
            calendarEditInfo: true, 
            eventEditInfo: false, 
            eventsUpdated: false, 
            calendarsUpdated: false 
        })
    }
    dateClicked = (date) => {
        this.setState({ 
            creatingMode: true, 
            eventsUpdated: true, 
            calendarsUpdated: false, 
            dateClickedDate: date, 
            eventEditInfo: false, 
            calendarEditInfo: false,
        })
    }
    createCalendarHandler = () => {
        this.setState({ 
            creatingMode: true, 
            calendarsUpdated: true, 
            eventsUpdated: false, 
            eventEditInfo: false, 
            calendarEditInfo: false,
        })
    }

    copyEvents = (newEvents) => {
        this.setState({
            events: this.state.events.concat(newEvents)
        })//TO DO: filter duplicate events
    }

    editEvent = (eventEdited, id) => {
        const newEvents = this.state.events.slice();
        newEvents.map(event => {
            if (event.id === id) {
                event.title = eventEdited.title
                event.description = eventEdited.description
                event.start = eventEdited.start
                event.end = eventEdited.end
                event.participants = eventEdited.participants
            }
        })
        this.setState({events: newEvents})
    }

    loadNewCalendars = () => {
        this.setState({loadNewCalendars: true})
    }

    createCancelHander = () => {
        this.setState({
            creatingMode: false
        })
    }

    render() {
        let events = null;
        let calendars = null;
        if (this.state.calendars.length) {
            calendars = this.state.calendars.map(calendar => {
                return <SingleCalendar 
                            key={calendar.id}
                            id={calendar.id}
                            canHide={calendar.canHide}
                            canDelete={calendar.canDelete}
                            color={calendar.color}
                            description={calendar.description}
                            name={calendar.name}
                            copyEvents={this.copyEvents}
                        />
            })
        }
        if (this.state.events)
            events = this.state.events

        return (
            <AccountContainer>
                { this.state.error ? <ErrorContainer><h3>Something went wrong. Please try again</h3></ErrorContainer> : null}
                <Modal show={this.state.creatingMode} modalClosed={this.createCancelHander}>
                    {this.state.eventsUpdated ? 
                    <EventView close={this.createCancelHander} calendars={this.state.calendars} loadNewCalendars={this.loadNewCalendars} date={this.state.dateClickedDate}/> 
                    : null}
                    {this.state.calendarsUpdated ? <CalendarView close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars} /> : null}
                    {this.state.eventEditInfo ? <EventEditView  id={this.state.editingEvent} close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars} editEvent={this.editEvent}/> : null}
                    {this.state.calendarEditInfo ? <CalendarEditView id={this.state.editingCalendar} close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars} /> : null}
                </Modal>
                <Modal show={false}>{calendars}</Modal>
                <ParentCalendarContainer>
                    <SideBar calendars={calendars} newcal={this.createCalendarHandler} clicked={this.createEventHandler} editCalendar={this.editCalendarHandler} loadNewCalendars={this.loadNewCalendars}/>
                    <CalendarContainer>
                        <Calendar events={events} dateClicked={this.dateClicked} eventClicked={this.editEventHandler}/>
                    </CalendarContainer>
                </ParentCalendarContainer>
            </AccountContainer>
        )
    }
}

export default Account