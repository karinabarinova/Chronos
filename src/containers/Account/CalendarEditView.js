import React, { Component } from 'react'
import axios from 'axios'
import {
    TextContainer,
    Container, 
    Input,
    InputColor,
    InputDescription,
    InputBlockFlex,
    InputBlock,
    CloseButton
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class CalendarEditView extends Component {
    state = {
        name: '',
        description: '',
        color: '',
        participants: '',
        canDelete: false
    }

    componentDidMount() {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/calendars/${this.props.id}`, config)
            .then(({data}) => {
                this.setState({
                    name: data.name,
                    description: data.description,
                    participants: data.participants,
                    color: data.color,
                    canDelete: data.canDelete
                })
            })
            .catch(e => console.log(e))
    }

    calendarEditHandler = () => {
        const calendar = {
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            participants: this.state.participants
        };
    
        axios.patch(`/calendars/${this.props.id}`, calendar, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
        }})
            .then((res) => {
                this.props.loadNewCalendars()
                this.props.close()
            })
            .catch(e => console.log(e))
    }

    calendarDeleteHandler = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.delete(`/calendars/${this.props.id}`, config)
            .then(res => {
                this.props.loadNewCalendars()
                this.props.close()
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
                    <label>Name</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}
                        />
                    </InputBlock>
                    <label>Description</label>
                    <InputBlockFlex>
                    <InputBlock>
                        <InputDescription 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        />
                    </InputBlock>
                    <InputBlock>
                        <InputColor 
                        type="color" 
                        value={this.state.color}
                        onChange={(event) => this.setState({color: event.target.value})}
                        />
                    </InputBlock>
                    </InputBlockFlex>
                    <label>Who will participate?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.participants}
                        onChange={(event) => this.setState({participants: event.target.values})}
                        />
                    </InputBlock>
                    <Button onClick={this.calendarEditHandler} danger={false}>Update</Button>
                    {this.state.canDelete ? <Button onClick={this.calendarDeleteHandler} danger={true}>Delete</Button> : null}
            </Container>
        )
    }
}

export default CalendarEditView
