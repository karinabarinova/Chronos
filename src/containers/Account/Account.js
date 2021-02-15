import React, { Component } from 'react'
import axios from 'axios'

import { 
    CalendarContainer,
    FormImage,
} from '../../components/Forms/Form.elements'
import { Calendar } from '../../components'

class Account extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get('/calendars/3/events', config)
            .then(res => this.setState({ events: res.data }))
            .catch(e => console.log(e))
    }

    render() {
        return (
            <CalendarContainer>
                <Calendar events={this.state.events}/>
            </CalendarContainer>
        )
    }
}

export default Account