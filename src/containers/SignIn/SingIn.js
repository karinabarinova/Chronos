import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/index';

import {SignIn, FormSuccessSignIn} from '../../components';
import { 
    FormContainer,
    CloseButton,
    FormImage,
    FormContentLeft
} from '../../components/Forms/Form.elements'
const image = require('../../images/signin.svg').default


class Login extends Component {
    state = {
        isSubmitted: false
    }

    submitForm = (values) => {
        this.props.onAuth(values.login, values.password,
            null, values.email, null, false);
    }

    render() {
        let authRedirect = null;
        let error = null;
        if (this.props.isAuthenticated && !authRedirect)
            authRedirect = <Redirect to="/" />
        if (this.props.error)
            error = this.props.error
    
        return (
            <FormContainer>
                <CloseButton>x</CloseButton>
                <FormContentLeft>
                    <FormImage src={image} alt="Authentication Image" />
                </FormContentLeft>
                {!this.state.isSubmitted ? (
                    <SignIn submitForm={this.submitForm} error={error} redirect={authRedirect} />
                ) : (
                    <FormSuccessSignIn />
                )}
            </FormContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.jwtToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (login, password, repeat_password, email, fullName, isSignup) => dispatch(actions.auth(login, password, repeat_password, email, fullName, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
