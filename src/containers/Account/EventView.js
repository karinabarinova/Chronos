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
            <Container>
                <TextContainer>
                    <h3 style={{display: "inline"}}>Create an event</h3>
                    <CloseButton onClick={this.props.close}>x</CloseButton>
                </TextContainer>
                
                    <label>What do you want to do?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
                    </InputBlock>
                    <label>Description</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.title}
                        onChange={(event) => this.setState({title: event.target.value})}
                        placeholder="e.g.: Buy Milk" />
                    </InputBlock>
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
