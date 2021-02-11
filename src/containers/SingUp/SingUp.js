import React, { useState } from 'react'
import {SignUp, FormSuccessSignIn} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signup.svg').default


const Register = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            {!isSubmitted ? (
                <SignUp submitForm={submitForm} />
            ) : (
                <FormSuccessSignIn />
            )}
        </FormContainer>
    )
}

export default Register
