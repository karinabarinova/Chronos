import React from 'react';
import {validateRegisteredEmail as validate} from './validateInfo';
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

const FormValidateRegisteredEmail = ({ submitForm, error }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
        <FormContentRight>
            <Form onSubmit={handleSubmit} noValidate>
                <Heading>
                Provide the token sent to your email
                </Heading>
                <Error>{error}</Error>
                <FormInputs>
                    <FormLabel>Verification token</FormLabel>
                    <FormInput
                        type="text"
                        name="token"
                        placeholder='Enter token'
                        value={values.token}
                        onChange={handleChange}
                    />
                {errors.token && <Error>{errors.token}</Error>}
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

export default FormValidateRegisteredEmail;