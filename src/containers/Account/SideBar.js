import React from 'react'
import CalendarList from './CalendarList';
import {SidebarContainer, SidebarTitle} from './SideBar.elements';

const SideBar = () => {
    return (
        <SidebarContainer>
            <div>
            <SidebarTitle>My Calendars</SidebarTitle>
                <CalendarList />
            </div>
        </SidebarContainer>
    )
}

export default SideBar;
