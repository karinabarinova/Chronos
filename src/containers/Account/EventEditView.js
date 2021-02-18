import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios'
import {
    TextContainer,
    Container, 
    Input,
    InputBlock,
    CloseButton,
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class EventEditView extends Component {
    state = {
        id: '',
        title: '',
        description: '',
        start: '',
        end: '',
        participants: ''
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.id)
            this.loadData()
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/events/${this.props.id}`, config)
            .then(({data}) => {
                this.setState({
                    id: this.props.id,
                    title: data.title,
                    description: data.description,
                    participants: data.participants,
                    start: data.start,
                    end: data.end
                })
            })
            .catch(e => console.log(e))
    }

    eventEditHandler = () => {
            const event = {
                title: this.state.title,
                description: this.state.description,
                type: this.state.type,
                start: this.state.start,
                end: this.state.end,
                participants: this.state.participants
            }
    
            axios.patch(`/events/${this.props.id}`, event, {headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }})
                .then((res) => {
                    this.props.close()
                    this.props.loadNewCalendars()
                    this.setState({start: ''})
                })
                .catch(e => console.log(e))
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
                        />
                    </InputBlock>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        />
                    </InputBlock>
                    <label>Start:</label>
                    <InputBlock>
                        <DateTimePicker 
                        format={"y-MM-dd h:mm:ss"}
                        // autoFocus={true}
                        value={this.state.start}
                        onChange={(value) => this.setState({start: value})}/>
                    </InputBlock>
                    <label>End:</label>
                    <InputBlock>
                        <DateTimePicker 
                        format={"y-MM-dd h:mm:ss"}
                        value={this.state.end}
                        onChange={(value) => this.setState({endDate: value})}/>
                    </InputBlock>
                    <label>Who will participate?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.participants}
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
