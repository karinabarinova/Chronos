import React, { Component } from 'react'
import axios from 'axios'
import {
    TextContainer,
    Container, 
    Input,
    InputTime,
    InputBlock,
    CloseButton,
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class EventEditView extends Component {
    state = {
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        participants: ''
    }

    componentDidMount() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/events/${this.props.id}`, config)
            .then(({data}) => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    participants: data.participants,
                    // startDate: data.start,
                    // endDate: data.end
                })
            })
            .catch(e => console.log(e))
    }

    eventEditHandler = () => {
        if (this.state.calendar !== 0) {
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
    
            // axios.patch(`/events/${this.props.id}`, event, {headers: {
            //     'authorization': `Basic ${localStorage.getItem('token')}`
            // }})
            //     .then((res) => {
            //         this.props.close()
            //         this.props.loadNewCalendars()
            //         this.setState({startDate: ''})
            //     })
            //     .catch(e => console.log(e))
        }
    }

    eventDeleteHandler = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.delete(`/events/${this.props.id}`, config)
            .then(res => {
                this.props.close()
                this.props.loadNewCalendars()
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <Container>
                <TextContainer>
                    <h3 style={{display: "inline"}}>Edit an event</h3>
                    <CloseButton onClick={this.props.close}>x</CloseButton>
                </TextContainer>
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
                    <Button onClick={this.eventEditHandler} danger={false}>Update</Button>
                    <Button onClick={this.eventDeleteHandler} danger={true}>Delete</Button>
            </Container>
        )
    }
}

export default EventEditView
