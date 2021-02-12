import React, { useState } from 'react'
import axios from 'axios';
import {FormResetPassword} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signin.svg').default


const ResetPassword = (props) => {
    const [error, setError] = useState(null);

    const submitForm = (values) => {
        axios.post('auth/password-reset', {email: values.email})
            .then(res => props.history.push('/reset-password-confirm'))
            .catch(e => setError(e))
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            <FormResetPassword submitForm={submitForm} error={error} />
        </FormContainer>
    )
}

export default ResetPassword
