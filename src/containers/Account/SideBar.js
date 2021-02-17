import React from 'react'
import CalendarList from './CalendarList';
import {SidebarContainer, SidebarTitle, NewCalendarButton} from './SideBar.elements';

const SideBar = (props) => {

    const NewCalendarClicked = () => {
        props.newcal()
    }
    
    return (
        <SidebarContainer>
            <div>
            <SidebarTitle>My Calendars</SidebarTitle>
                <CalendarList calendars={props.calendars} />
                <NewCalendarButton onClick={NewCalendarClicked}>+ Add Calendar</NewCalendarButton>
            </div>
        </SidebarContainer>
    )
}

export default SideBar;
