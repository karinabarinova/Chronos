import React from 'react'
import {InfoSection, Pricing} from '../../components';
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from '../Data';

const Services = () => {
    return (
        <>
            <Pricing />
            <InfoSection {...homeObjFour} />
        </>
    )
}

export default Services
