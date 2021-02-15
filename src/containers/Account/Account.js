import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    FormImage,
} from '../../components/Forms/Form.elements'
import { Calendar } from '../../components'

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
        axios.get('/calendars/4/events', config)
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
            <CalendarContainer>
                <Calendar events={events}/>
            </CalendarContainer>
        )
    }
}

export default Account