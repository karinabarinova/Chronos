import React, { useState } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/index';

import {FormValidateRegisteredEmail, FormSuccessSignIn} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signup.svg').default


const ValidateEmail = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm(values) {
        console.log(values)
        // props.onAuth(values.login, values.password,
        //     values.repeat_password, values.email, values.fullName, true);
        // setIsSubmitted(true);
        // props.history.push('/verify-email');
    }

    return (
        <FormContainer>
            <CloseButton>x</CloseButton>
            <FormContentLeft>
                <FormImage src={image} alt="" />
            </FormContentLeft>
            {!isSubmitted ? (
                <FormValidateRegisteredEmail submitForm={submitForm} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateEmail);

