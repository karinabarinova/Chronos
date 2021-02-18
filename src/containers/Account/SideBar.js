import React from 'react'
import CalendarList from './CalendarList';
import {SidebarContainer, SidebarTitle, NewCalendarButton} from './SideBar.elements';
import NewEvent from './NewEvent'

const SideBar = (props) => {

    const NewCalendarClicked = () => {
        props.newcal()
    }

    const NewEventClicked = () => {
        props.clicked()
    }
    
    return (
        <SidebarContainer>
            <NewEvent clicked={NewEventClicked}/>
            <div>
            <SidebarTitle>My Calendars</SidebarTitle>
                <CalendarList calendars={props.calendars} editCalendar={props.editCalendar} />
                <NewCalendarButton onClick={NewCalendarClicked}>+ Add Calendar</NewCalendarButton>
            </div>
        </SidebarContainer>
    )
}

export default SideBar;
