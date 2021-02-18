import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    AccountContainer,
    ParentCalendarContainer
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
        editingCalendar: null
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
                        calendarEditInfo: false 
                    })
                }
            })
            .catch(e => console.log(e))
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
            calendarEditInfo: false
        })
    }
    editEventHandler = (id) => {
        this.setState({ 
            creatingMode: true, 
            editingEvent: id, 
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
            calendarEditInfo: false
        })
    }
    createCalendarHandler = () => {
        this.setState({ 
            creatingMode: true, 
            calendarsUpdated: true, 
            eventsUpdated: false, 
            eventEditInfo: false, 
            calendarEditInfo: false
        })
    }

    copyEvents = (newEvents) => {
        this.setState({
            events: this.state.events.concat(newEvents)
        })//TO DO: filter duplicate events
    }

    loadNewCalendars = () => {
        this.setState({loadNewCalendars: true})
    }

    createCancelHander = () => {
        this.setState({
            creatingMode: false 
            // editingEvent: null, 
            // editingCalendar: null
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
                <Modal show={this.state.creatingMode} modalClosed={this.createCancelHander}>
                    {this.state.eventsUpdated ? 
                    <EventView close={this.createCancelHander} calendars={this.state.calendars} loadNewCalendars={this.loadNewCalendars} date={this.state.dateClickedDate}/> 
                    : null}
                    {this.state.calendarsUpdated ? <CalendarView close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars} /> : null}
                    {this.state.eventEditInfo ? <EventEditView  id={this.state.editingEvent} close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars}/> : null}
                    {this.state.calendarEditInfo ? <CalendarEditView id={this.state.editingCalendar} close={this.createCancelHander} loadNewCalendars={this.loadNewCalendars} /> : null}
                    {calendars}
                </Modal>
                <ParentCalendarContainer>
                    <SideBar calendars={calendars} newcal={this.createCalendarHandler} clicked={this.createEventHandler} editCalendar={this.editCalendarHandler}/>
                    <CalendarContainer>
                        <Calendar events={events} dateClicked={this.dateClicked} eventClicked={this.editEventHandler}/>
                    </CalendarContainer>
                </ParentCalendarContainer>
            </AccountContainer>
        )
    }
}

export default Account