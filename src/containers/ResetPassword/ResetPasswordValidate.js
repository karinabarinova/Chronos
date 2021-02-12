import React, {useState} from 'react'
import axios from 'axios';
import {FormResetPasswordValidate} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signin.svg').default


const ResetPasswordValidate = (props) => {
    const [error, setError] = useState(null);

    const submitForm = async (values) => {
        await axios.post('/auth/reset-password', {
            token: values.token,
            password: values.password,
            confirmPassword: values.repeat_password
        })
            .then(res => props.history.push('/sign-in'))
            .catch(e => setError("Invalid Token or Password"))
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            <FormResetPasswordValidate submitForm={submitForm} error={error} />
        </FormContainer>
    )
}

export default ResetPasswordValidate
