import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import {
    FormContainer,
    CloseButton,
    FormContentRight,
    Form,
    Heading,
    FormInputs,
    Error,
    FormLabel,
    FormInput,
    FormInputLoginSpan,
    FormInputLoginLink,
    FormInputButton
} from './Form.elements';
// import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
        <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
                <Heading>
                Get started with us today! Create your account by filling out the
                information below.
                </Heading>
                <FormInputs>
                <FormLabel>Username</FormLabel>
                <FormInput
                    type='text'
                    name='username'
                    placeholder='Enter your username'
                    value={values.username}
                    onChange={handleChange}
                />
                {errors.username && <Error>{errors.username}</Error>}
                </FormInputs>
                <FormInputs>
                <FormLabel>Email</FormLabel>
                <FormInput
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && <Error>{errors.email}</Error>}
                </FormInputs>
                <FormInputs>
                <FormLabel>Password</FormLabel>
                <FormInput
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <Error>{errors.password}</Error>}
                </FormInputs>
                <FormInputs>
                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    type='password'
                    name='password2'
                    placeholder='Confirm your password'
                    value={values.password2}
                    onChange={handleChange}
                />
                {errors.password2 && <Error>{errors.password2}</Error>}
                </FormInputs>
                <FormInputButton type='submit'>
                Sign up
                </FormInputButton>
                <FormInputLoginSpan>
                Already have an account? Login <FormInputLoginLink to='/sign-in'>here</FormInputLoginLink>
                </FormInputLoginSpan>
            </Form>
        </FormContentRight>
  );
};

export default FormSignup;