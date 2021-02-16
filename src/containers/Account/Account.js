import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    AccountContainer,
    ParentCalendarContainer
} from './Account.elements'
import NewEvent from './NewEvent'
import { Calendar, Modal } from '../../components'
import SideBar from './SideBar';
import SingleCalendar from './SingleCalendar'
import EventView from './EventView';

class Account extends Component {
    _isMounted = false;

    state = {
        calendars: [],
        creatingMode: false,
        events: []
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
                if (this._isMounted)
                    this.setState({ calendars: res.data })
            })
            .catch(e => console.log(e))
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    createHandler = () => {
        this.setState({ creatingMode: true})
    }

    copyEvents(newEvents) {
        if (!this.state.events.length)
            this.setState({events: newEvents})
        else
            this.setState(({
                events: [...this.state.events, newEvents]
            }))
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
                    <EventView />
                </Modal>
                <NewEvent clicked={this.createHandler}/>
                <ParentCalendarContainer>
                    <SideBar calendars={calendars}/>
                    <CalendarContainer>
                        <Calendar events={events}/>
                    </CalendarContainer>
                </ParentCalendarContainer>
            </AccountContainer>
        )
    }
}

export default Account