import React from 'react'

import { 
    FormContainer,
    FormImage,
} from '../../components/Forms/Form.elements'

const image = require('../../images/notfound.svg').default

const NotFound = () => {
    return (
        <FormContainer>
            <FormImage src={image} alt="Authentication Image" />
        </FormContainer>
    )
}

export default NotFound
