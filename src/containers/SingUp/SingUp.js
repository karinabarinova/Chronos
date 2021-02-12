import React, { useState } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/index';

import {SignUp, FormSuccessSignIn} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signup.svg').default


const Register = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    function submitForm(values) {
        setError(null);
        props.onAuth(values.login, values.password,
            values.repeat_password, values.email, values.fullName, true);
        if(!props.error) {
            setIsSubmitted(true);
            props.history.push('/verify-email');
        } else {
            setError(props.error)
        }
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="Authentication Image" />
            </FormContentLeft>
            {!isSubmitted ? (
                <SignUp submitForm={submitForm} error={error} />
            ) : (
                <FormSuccessSignIn />
            )}
        </FormContainer>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password, repeat_password, email, fullName, isSignup) => dispatch(actions.auth(login, password, repeat_password, email, fullName, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

