import React from 'react';
import {validateInfoResetPasswordConfirm as validate} from './validateInfo';
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

const FormResetPasswordValidate = ({ submitForm }) => {
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
                <FormInputs>
                    <FormLabel>Token</FormLabel>
                    <FormInput
                        type='text'
                        name='token'
                        placeholder='Enter your token'
                        value={values.token}
                        onChange={handleChange}
                    />
                    {errors.token && <Error>{errors.token}</Error>}
                </FormInputs>
                <FormInputs>
                    <FormLabel>New Password</FormLabel>
                    <FormInput
                        type='password'
                        name='password'
                        placeholder='Enter new password'
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
                        placeholder='Confirm new password'
                        value={values.repeat_password}
                        onChange={handleChange}
                    />
                    {errors.repeat_password && <Error>{errors.repeat_password}</Error>}
                </FormInputs>
                <FormInputButton type='submit'>
                Submit
                </FormInputButton>
            </Form>
        </FormContentRight>
  );
};

export default FormResetPasswordValidate;