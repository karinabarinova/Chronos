import React from 'react';
import validate from './validateInfo';
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

const FormResetPassword = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
        <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
                <Heading>
                Provide your email to reset password
                </Heading>
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
                <FormInputButton type='submit'>
                Submit
                </FormInputButton>
                <FormInputLoginSpan>
                Don't have an accout? Create one <FormInputLoginLink to='/sign-up'>here</FormInputLoginLink>
                </FormInputLoginSpan>
            </Form>
        </FormContentRight>
  );
};

export default FormResetPassword;