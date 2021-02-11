import React from 'react';
import {
    FormContentRight,
    FormSuccess,
    FormImage2
} from './Form.elements'

const FormSuccess = () => {
  return (
    <FormContentRight>
      <FormSuccess>We have received your request!</FormSuccess>
      <FormImage2 src='../images/welcome.svg' alt='success-image' />
    </FormContentRight>
  );
};

export default FormSuccess;