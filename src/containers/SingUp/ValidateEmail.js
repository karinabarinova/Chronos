import React, { useState } from 'react'
import axios from 'axios'; 
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import {FormValidateRegisteredEmail} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'

const image = require('../../images/signup.svg').default

const ValidateEmail = (props) => {
    const [error, setError] = useState(null);

    function submitForm({token}) {
        axios.post('/auth/verify-email', {token})
            .then(res => props.history.push('/sign-in'))
            .catch(e => setError("Invalid Verification token"))
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="Authentication Image" />
            </FormContentLeft>
            <FormValidateRegisteredEmail submitForm={submitForm} error={error} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateEmail);

