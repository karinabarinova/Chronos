import React from 'react'
import {SignUp} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signup.svg').default


const Services = () => {
    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            <SignUp />
        </FormContainer>
    )
}

export default Services
