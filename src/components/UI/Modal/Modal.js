import React from 'react'
import { ModalContainer } from './Modal.elements'

const Modal = (props) => (
    <ModalContainer show={props.show}>
        {props.children}
    </ModalContainer>
)

export default Modal
