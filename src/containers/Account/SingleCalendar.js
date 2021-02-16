import React, { Component } from 'react'
import axios from 'axios'

class SingleCalendar extends Component {
    _isMounted = false;
    state = {}

    componentDidMount() {
        this._isMounted = true;
        this.loadData();
    }

    loadData = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/calendars/${this.props.id}/events`, config)
            .then(res => {
                if (this._isMounted) {
                    res.data.map(data => {
                        this.props.copyEvents(data)
                    })
                }
            })
            .catch(e => console.log(e))
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
                <p>{this.props.color}</p>
            </div>
        )
    }
}

export default SingleCalendar
