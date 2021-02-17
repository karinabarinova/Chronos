import React, { Component } from 'react'
import axios from 'axios'

class EventView extends Component {
    state = {
        title: '',
        description: '',
        type: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        participants: ''
    }

    eventCreateHandler = () => {
        let start = '';
        start = start.concat(this.state.startDate, " ", this.state.startTime)
        let end = '';
        end = end.concat(this.state.endDate, " ", this.state.endTime)
        const event = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            start,
            end,
            participants: this.state.participants
        }

        console.log(event.start)
        console.log(event.end)

        // axios.post('/events', event, {headers: {
        //     'authorization': `Basic ${localStorage.getItem('token')}`
        // }})
        //     .then((res) => {
        //         this.props.close()
        //     })
        //     .catch(e => console.log(e))
    }

    render() {
        return (
            <div>
                <div>
                    <div><h3>Create an event</h3></div>
                    <button onClick={this.props.close}>x</button>
                </div>
                {/* <form> */}
                    <label>What do you want to do?</label>
                    <div>
                        <input 
                        type="text" 
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
                    </div>
                    <label>Start:</label>
                    <div>
                        <input 
                        type="date" 
                        value={this.state.startDate}
                        onChange={(event) => this.setState({startDate: event.target.value})}/>
                        <input 
                        type="time"
                        value={this.state.startTime}
                        onChange={(event) => this.setState({startTime: event.target.value})}/> 
                    </div>
                    <label>End:</label>
                    <div>
                        <input 
                        type="date" 
                        value={this.state.endDate}
                        onChange={(event) => this.setState({endDate: event.target.value})}/>
                        <input 
                        type="time"
                        value={this.state.endTime}
                        onChange={(event) => this.setState({endTime: event.target.value})}/> 
                    </div>
                    <label>Who will participate?</label>
                    <div>
                        <input 
                        type="text" 
                        value={this.state.participants}
                        onChange={(event) => this.setState({participants: event.target.values})}
                        />
                    </div>
                    <button onClick={this.eventCreateHandler}>Submit</button>
                {/* </form> */}
            </div>
        )
    }
}

export default EventView
