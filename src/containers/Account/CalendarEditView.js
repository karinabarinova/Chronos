import React, { Component } from 'react'
import axios from 'axios'
import {checkForm} from '../../components/Forms/checkForm'
import {Error} from '../../components/Forms/Form.elements'

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
        id: '',
        name: '',
        description: '',
        color: '',
        participants: '',
        canDelete: false,
        errors: {
            name: '',
            description: '',
            participants: ''
        }
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.id)
            this.loadData()
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const config = {
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }
        }
        axios.get(`/calendars/${this.props.id}`, config)
            .then(({data}) => {
                this.setState({
                    id: this.props.id,
                    name: data.name,
                    description: data.description,
                    participants: data.participants,
                    color: data.color,
                    canDelete: data.canDelete
                })
            })
            .catch(e => this.props.catchError())
    }

    calendarEditHandler = () => {
        const calendar = {
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            participants: this.state.participants
        };

        this.setState({...this.state, errors: checkForm(calendar, "calendar")});
        if (this.state.errors && Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {
            axios.patch(`/calendars/${this.props.id}`, calendar, {headers: {
                'authorization': `Basic ${localStorage.getItem('token')}`
            }})
                .then((res) => {
                    this.props.loadNewCalendars()
                    this.props.close()
                })
                .catch(e => this.props.catchError())
        }
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
            .catch(e => this.props.catchError())
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
                    {this.state.errors.name && <Error>{this.state.errors.name}</Error>}
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
                    {this.state.errors.description && <Error>{this.state.errors.description}</Error>}
                    <label>Who will participate?</label>
                    <InputBlock>
                        <Input 
                        type="text" 
                        value={this.state.participants}
                        onChange={(event) => this.setState({participants: event.target.values})}
                        />
                    </InputBlock>
                    {this.state.errors.participants && <Error>{this.state.errors.participants}</Error>}
                    <Button onClick={this.calendarEditHandler} danger={false}>Update</Button>
                    {this.state.canDelete ? <Button onClick={this.calendarDeleteHandler} danger={true}>Delete</Button> : null}
            </Container>
        )
    }
}

export default CalendarEditView
