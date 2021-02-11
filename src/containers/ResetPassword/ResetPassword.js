import React from 'react'
import {FormResetPassword} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signin.svg').default


const ResetPassword = () => {
    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            <FormResetPassword />
        </FormContainer>
    )
}

export default ResetPassword
