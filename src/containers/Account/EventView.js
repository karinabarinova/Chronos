import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios'
import {
    TextContainer,
    Container, 
    Input,
    InputBlock,
    CloseButton,
    Select
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class EventView extends Component {
    state = {
        calendar: null,
        title: '',
        description: '',
        type: 'arrangement',
        start: '',
        end: '',
        participants: ''
    }

    componentDidMount() {
        if (this.props.date)
            this.setState({start: this.props.date})
    }

    eventCreateHandler = () => {
            const event = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                start: this.state.start,
                end: this.state.end,
                participants: this.state.participants
            }
    
            axios.post(`/calendars/${this.state.calendar}/events`, event, {headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }})
                .then((res) => {
                    this.props.close()
                    this.props.loadNewCalendars()
                    this.setState({start: ''})
                })
                .catch(e => console.log(e))
    }

    render() {
        let options = null;
        if (this.props.calendars) {
            options = this.props.calendars.map(({name, id}, index) => <option key={id} value={id}>{name}</option>)
            if (this.state.calendar != options[0].props.value)
            this.setState({calendar: options[0].props.value})
        }
        return (
            <Container>
                <TextContainer>
                    <h3 style={{display: "inline"}}>Create an event</h3>
                    <CloseButton onClick={this.props.close}>x</CloseButton>
                </TextContainer>
                    <label>Calendar</label>
                    <InputBlock>
                        <Select
                        defaultValue={options[0].props.value}
                        value={this.state.calendar}
                        onChange={(event) => this.setState({calendar: event.target.value})}
                        >
                            {options}
                        </Select> 
                    </InputBlock>
                    <InputBlock>
                        <Select
                        value={this.state.type}
                        onChange={(event) => this.setState({type: event.target.value})}
                        >
                            <option value="arrangement">Arrangement</option>
                            <option value="task">Task</option>
                            <option value="reminder">Reminder</option>
                        </Select> 
                    </InputBlock>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                        placeholder="What do you want to do?" />
                    </InputBlock>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        placeholder="Description" />
                    </InputBlock>
                    <label>Start:</label>
                    <InputBlock>
                        <DateTimePicker 
                        format={"y-MM-dd h:mm:ss"}
                        value={this.state.start}
                        onChange={(value) => this.setState({start: value})}/>
                    </InputBlock>
                    <label>End:</label>
                    <InputBlock>
                        <DateTimePicker 
                        format={"y-MM-dd h:mm:ss"}
                        value={this.state.end}
                        onChange={(value) => this.setState({end: value})}/>
                    </InputBlock>
                    <label>Who will participate?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.participants}
                        placeholder="e.g.: carlos@carlos.com" 
                        onChange={(event) => this.setState({participants: event.target.values})}
                        />
                    </InputBlock>
                    <Button onClick={this.eventCreateHandler}>Submit</Button>
            </Container>
        )
    }
}

export default EventView
