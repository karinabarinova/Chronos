import React, { Component } from 'react'
import axios from 'axios'
import {
    TextContainer,
    Container, 
    Input,
    InputTime,
    InputBlock,
    CloseButton
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class CalendarView extends Component {
    state = {
        name: '',
        description: '',
        color: '',
        participants: ''
    }

    calendarCreateHandler = () => {
        const calendar = {
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            participants: this.state.participants
        };
    
        axios.post(`/calendars/`, calendar, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then((res) => {
                // this.props.close()
                // this.props.loadNewCalendars()
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <Container>
                <TextContainer>
                    <h3 style={{display: "inline"}}>Create a calendar</h3>
                    <CloseButton onClick={this.props.close}>x</CloseButton>
                </TextContainer>
                    <label>fullName</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
                    </InputBlock>
                    <label>Description</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
                    </InputBlock>
                    <label>Color</label>
                    <InputBlock>
                        <Input 
                        type="color" 
                        value={this.state.color}
                        onChange={(event) => this.setState({color: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
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
                    <Button onClick={this.calendarCreateHandler}>Submit</Button>
            </Container>
        )
    }
}

export default CalendarView
