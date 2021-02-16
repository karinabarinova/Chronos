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

class Account extends Component {
    _isMounted = false;

    state = {
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
        axios.get('/calendars/2/events', config)
            .then(res => {
                if (this._isMounted)
                    this.setState({ events: res.data })
            })
            .catch(e => console.log(e))
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        let events = null;
        if (this.state.events)
            events = this.state.events

        return (
            <AccountContainer>
                <NewCalendar />
                <ParentCalendarContainer>
                    <SideBar />
                    <CalendarContainer>
                        <Calendar events={events}/>
                    </CalendarContainer>
                </ParentCalendarContainer>
            </AccountContainer>
        )
    }
}

export default Account