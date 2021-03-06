import React, { Component } from 'react'

import axios from 'axios'
import {checkForm} from '../../components/Forms/checkForm'
import {Error} from '../../components/Forms/Form.elements'

import {
    TextContainer,
    Container, 
    Input,
    InputTime,
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
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        participants: '',
        errors: {
            title: '',
            description: '',
            start: '',
            end: '',
            type: '',
            participants: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if (nextProps.date !== prevProps.date) {
            return { startDate: nextProps.date}
        }
        else return null
    }

    eventCreateHandler = () => {
            let start = '';
            start = start.concat(this.state.startDate, " ", this.state.startTime);
            let end = '';
            if (this.state.endTime)
                end = end.concat(this.state.endDate, " ", this.state.endTime)
                
            const event = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                start,
                end,
                participants: this.state.participants
            }

            this.setState({...this.state, errors: checkForm(event, "event")});
            if (this.state.errors && Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {    
                axios.post(`/calendars/${this.state.calendar}/events`, event, {headers: {
                    'authorization': `Basic ${localStorage.getItem('token')}`
                }})
                    .then((res) => {
                        this.props.close()
                        this.props.loadNewCalendars()
                        this.setState({startDate: '', title: '', description: ''})
                    })
                    .catch(e => console.log(e))

            }
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
                    {this.state.errors.type && <Error>{this.state.errors.type}</Error>}
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                        placeholder="What do you want to do?" />
                    </InputBlock>
                    {this.state.errors.title && <Error>{this.state.errors.title}</Error>}
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        placeholder="Description" />
                    </InputBlock>
                    {this.state.errors.description && <Error>{this.state.errors.description}</Error>}
                    <label>Start:</label>
                    <InputBlock>
                        <InputTime 
                        type="date" 
                        value={this.state.startDate}
                        onChange={(event) => this.setState({startDate: event.target.value})}/>
                        <InputTime 
                        type="time"
                        value={this.state.startTime}
                        onChange={(event) => this.setState({startTime: event.target.value})}/> 
                    </InputBlock>
                    {this.state.errors.start && <Error>{this.state.errors.start}</Error>}
                    <label>End:</label>
                    <InputBlock>
                        <InputTime 
                        type="date" 
                        value={this.state.endDate}
                        onChange={(event) => this.setState({endDate: event.target.value})}/>
                        <InputTime 
                        type="time"
                        value={this.state.endTime}
                        onChange={(event) => this.setState({endTime: event.target.value})}/> 
                    </InputBlock>
                    {this.state.errors.end && <Error>{this.state.errors.end}</Error>}
                    <label>Who will participate?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.participants}
                        placeholder="e.g.: carlos@carlos.com" 
                        onChange={(event) => this.setState({participants: event.target.value})}
                        />
                    </InputBlock>
                    {this.state.errors.participants && <Error>{this.state.errors.participants}</Error>}
                    <Button onClick={this.eventCreateHandler}>Submit</Button>
            </Container>
        )
    }
}

export default EventView
