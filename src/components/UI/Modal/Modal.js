import React from 'react'
import { ModalContainer } from './Modal.elements'

const Modal = (props) => (
    <ModalContainer>
        {props.children}
    </ModalContainer>
)

export default Modal
