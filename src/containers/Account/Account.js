import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    AccountContainer,
    ParentCalendarContainer
} from './Account.elements'
import NewCalendar from './NewCalendar'
import { Calendar } from '../../components'
import SideBar from './SideBar';
import SingleCalendar from './SingleCalendar'

class Account extends Component {
    _isMounted = false;

    state = {
        calendars: []
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

    render() {
        let events = null;
        let calendars = null;
        if (this.state.calendars.length) {
            calendars = this.state.calendars.map(calendar => {
                console.log(calendar)
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

        console.log("Calendars",this.state.calendars)
        if (this.state.events)
            events = this.state.events

        return (
            <AccountContainer>
                <NewCalendar />
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