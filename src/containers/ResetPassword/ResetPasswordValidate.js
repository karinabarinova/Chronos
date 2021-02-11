import React from 'react'
import {FormResetPasswordValidate} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signin.svg').default


const ResetPasswordValidate = () => {
    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            <FormResetPasswordValidate />
        </FormContainer>
    )
}

export default ResetPasswordValidate
