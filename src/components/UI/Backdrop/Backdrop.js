import React from 'react'
import { BackDropContainer } from './Backdrop.elements'

const Backdrop = (props) => (
    props.show ? <BackDropContainer onClick={props.clicked}></BackDropContainer> : null
)

export default Backdrop
