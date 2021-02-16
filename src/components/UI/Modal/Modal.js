import React from 'react'
import { ModalContainer } from './Modal.elements'
import Backdrop from '../Backdrop/Backdrop'
const Modal = (props) => (
    <div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <ModalContainer show={props.show}>
            {props.children}
        </ModalContainer>
    </div>
)

export default Modal
