import React from 'react'
import { ModalContainer } from './Modal.elements'

const Modal = (props) => (
    <ModalContainer
    style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}>
        {props.children}
    </ModalContainer>
)

export default Modal
