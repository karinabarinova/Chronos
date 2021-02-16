import React from 'react'
import CalendarList from './CalendarList';
import {SidebarContainer} from './Sidebar.elements';

const SideBar = () => {
    return (
        <SidebarContainer>
            <div>
            <h3>My Calendars</h3>
                <CalendarList />
            </div>
        </SidebarContainer>
    )
}

export default SideBar;
