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

class Account extends Component {
    _isMounted = false;

    state = {
        calendars: [],
        creatingMode: false,
        events: [],
        calendarsUpdated: false,
        eventsUpdated: false,
        loadNewCalendars: false,
        dateClickedDate: ''
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
                    this.setState({ calendars: res.data, loadNewCalendars: false, dateClickedDate: '' })
                }
            })
            .catch(e => console.log(e))
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    createEventHandler = () => {
        this.setState({ creatingMode: true, eventsUpdated: true, calendarsUpdated: false})
    }
    dateClicked = (date) => {
        this.setState({ creatingMode: true, eventsUpdated: true, calendarsUpdated: false, dateClickedDate: date})
    }
    createCalendarHandler = () => {
        this.setState({ creatingMode: true, calendarsUpdated: true, eventsUpdated: false})
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
        this.setState({creatingMode: false})
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
                    {calendars}
                </Modal>
                {/* <NewEvent clicked={this.createEventHandler}/> */}
                <ParentCalendarContainer>
                    <SideBar calendars={calendars} newcal={this.createCalendarHandler} clicked={this.createEventHandler}/>
                    <CalendarContainer>
                        <Calendar events={events} dateClicked={this.dateClicked}/>
                    </CalendarContainer>
                </ParentCalendarContainer>
            </AccountContainer>
        )
    }
}

export default Account