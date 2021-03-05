import React, { Component } from 'react'
import axios from 'axios'
import {checkForm} from '../../components/Forms/checkForm'
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
import {Error} from '../../components/Forms/Form.elements'

import { Button } from './NewEvent.elements';

class CalendarView extends Component {
    state = {
        name: '',
        description: '',
        color: '#1db58f',
        participants: '',
        errors: {
            name: '',
            description: '',
            participants: ''
        }
    }

    calendarCreateHandler = () => {
        const calendar = {
            name: this.state.name,
            description: this.state.description,
            color: this.state.color,
            participants: this.state.participants
        };

        this.setState({...this.state, errors: checkForm(calendar, "calendar")});
        console.log(this.state.errors)
        if (this.state.errors && Object.keys(this.state.errors).length === 0 && this.state.errors.constructor === Object) {
            axios.post(`/calendars/`, calendar, {headers: {
            'authorization': `Basic ${localStorage.getItem('token')}`
            }})
                .then((res) => {
                    this.props.loadNewCalendars()
                    this.props.close()
                })
                .catch(e => console.log(e))
        }        
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
                        placeholder="e.g.: Work" />
                    </InputBlock>
                    {this.state.errors.name && <Error>{this.state.errors.name}</Error>}
                    <label>Description</label>
                    <InputBlockFlex>
                    <InputBlock>
                        <InputDescription 
                        type="text" 
                        value={this.state.description}
                        onChange={(event) => this.setState({description: event.target.value})}
                        placeholder="e.g.: Work-related tasks" />
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
                        placeholder="e.g.: carlos@carlos.com" 
                        onChange={(event) => this.setState({participants: event.target.value})}
                        />
                    </InputBlock>
                    {this.state.errors.participants && <Error>{this.state.errors.participants}</Error>}
                    <Button onClick={this.calendarCreateHandler}>Submit</Button>
            </Container>
        )
    }
}

export default CalendarView
