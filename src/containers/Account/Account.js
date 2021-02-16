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
        creatingMode: false
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
                        />
            })
        }
        if (this.state.events)
            events = this.state.events

        return (
            <AccountContainer>
                <Modal show={this.state.creatingMode}>
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