import React from 'react';
import {validateInfoLogin as validate} from './validateInfo';
import useForm from './useForm';
import {
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

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
        <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
                <Heading>
                Welcome back! Let's nail the day together
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
                <FormInputButton type='submit'>
                Sign in
                </FormInputButton>
                <FormInputLoginSpan>
                Don't have an accout? Create one <FormInputLoginLink to='/sign-up'>here</FormInputLoginLink>
                </FormInputLoginSpan>
                <FormInputLoginSpan>
                Forgot Password? Let's reset it <FormInputLoginLink to='/reset-password'>here</FormInputLoginLink>
                </FormInputLoginSpan>
            </Form>
        </FormContentRight>
  );
};

export default FormSignup;