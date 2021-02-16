import React, { Component } from 'react'
import axios from 'axios'

class SingleCalendar extends Component {
    _isMounted = false;
    state = {
        events: []
    }

    componentDidMount() {
        this._isMounted = true
        // this.loadData();
    }

    // loadData() {
    //     const config = {
    //         headers: {
    //             'authorization': `Basic ${localStorage.getItem('token')}`
    //         }
    //     }
    //     axios.get(`/calendars/${id}/events`, config)
    //         .then(res => {
    //             if (this._isMounted) {
    //                 this.setState({ events: res.data })
    //             }
    //         })
    //         .catch(e => console.log(e))
    // }

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
