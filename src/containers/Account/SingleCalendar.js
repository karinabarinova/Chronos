import React, { Component } from 'react'
import axios from 'axios'

class SingleCalendar extends Component {
    _isMounted = false;
    _isUpdated = false;
    state = {
        events: []
    }

    componentDidUpdate(){
        this._isUpdated = true;
        this.loadData()
    }

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
                if (this._isMounted || this._isUpdated) {
                    if (this.state.events.length !== res.data.length) {
                        this.setState({events: res.data})
                        this.props.copyEvents(res.data)
                    }
                    this._isUpdated = false;
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
