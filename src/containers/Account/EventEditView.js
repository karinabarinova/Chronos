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
} from './EventView.elements.js'

import { Button } from './NewEvent.elements';

class EventEditView extends Component {
    state = {
        id: '',
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        participants: '',
        errors: {
            title: '',
            description: '',
            start: '',
            end: ''
        }
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
                let start = new Date(data.start)
                let end = null;
                if (data.end)
                    end = new Date(data.end)
                this.setState({
                    id: this.props.id,
                    title: data.title,
                    description: data.description,
                    participants: data.participants,
                    startDate: `${start.getFullYear()}-${("0" + (start.getMonth() + 1)).slice(-2)}-${("0" + start.getDate()).slice(-2)}`,
                    startTime: `${("0" + start.getHours()).slice(-2)}:${("0" + start.getMinutes()).slice(-2)}:${("0" + start.getSeconds()).slice(-2)}`,
                    endDate: end ? `${end.getFullYear()}-${("0" + (end.getMonth() + 1)).slice(-2)}-${("0" + end.getDate()).slice(-2)}` : '',
                    endTime:  end ? `${("0" + end.getHours()).slice(-2)}:${("0" + end.getMinutes()).slice(-2)}:${("0" + end.getSeconds()).slice(-2)}` : ''
                })
            })
            .catch(e => console.log(e))
    }

    eventEditHandler = () => {
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
            axios.patch(`/events/${this.props.id}`, event, {headers: {
                        'authorization': `Basic ${localStorage.getItem('token')}`
                }})
                    .then((res) => {
                        this.setState({startDate: '', title: '', description: '', participants: '', startTime: '', endDate: '', endTime: ''})
                        this.props.close()
                        this.props.loadNewCalendars()
                        this.props.editEvent(event, this.state.id)
                    })
                    .catch(e => console.log(e))
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
                        />
                    </InputBlock>
                    {this.state.errors.title && <Error>{this.state.errors.title}</Error>}
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        />
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
