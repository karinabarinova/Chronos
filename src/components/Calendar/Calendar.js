import React from 'react';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const Calendar = (props) => {
    
    return (
        <FullCalendar
        initialView="dayGridWeek" 
        nowIndicator={true}
        businessHours={{
            daysOfWeek:[ 1, 2, 3, 4, 5 ],
            startTime: '9:00',
            endTime: '18:00',
        }}
        eventColor="#378006"
        weekNumbers={true}
        weekText="Week #"
        dayHeaders={true}
        dayHeaderFormat={{ weekday: 'long', month: 'short', day: 'numeric', omitCommas: true }
        }
        handleWindowResize={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        headerToolbar={{
          left: "prev,next,today", //"prevYear,prev,next,nextYear,today"
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        footerToolbar={{
            left: "prev,next,today", //"prevYear,prev,next,nextYear,today"
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={props.events}
      />
    )
}

export default Calendar;