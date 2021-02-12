import React from 'react';
import {validateInfoRegistration as validate} from './validateInfo';
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

const FormSignup = ({ submitForm, error }) => {
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
                <Error>{error}</Error>
                <FormInputs>
                <FormLabel>Username</FormLabel>
                <FormInput
                    type='text'
                    name='login'
                    placeholder='Enter your username'
                    value={values.login}
                    onChange={handleChange}
                />
                {errors.login && <Error>{errors.login}</Error>}
                </FormInputs>
                <FormInputs>
                <FormLabel>Name</FormLabel>
                <FormInput
                    type='text'
                    name='fullName'
                    placeholder='Enter your name'
                    value={values.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <Error>{errors.fullName}</Error>}
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
                    name='repeat_password'
                    placeholder='Confirm your password'
                    value={values.repeat_password}
                    onChange={handleChange}
                />
                {errors.repeat_password && <Error>{errors.repeat_password}</Error>}
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