import React from 'react'
import { Container, Button } from './NewEvent.elements';

const NewEvent = (props) => {
    return (
        <Container>
          <Button onClick={props.clicked}>+</Button>  
        </Container>
    )
}

export default NewEvent
