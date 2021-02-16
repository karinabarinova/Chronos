import React from 'react'
import CalendarList from './CalendarList';
import {SidebarContainer, SidebarTitle} from './SideBar.elements';

const SideBar = (props) => {
    return (
        <SidebarContainer>
            <div>
            <SidebarTitle>My Calendars</SidebarTitle>
                <CalendarList calendars={props.calendars} />
            </div>
        </SidebarContainer>
    )
}

export default SideBar;
