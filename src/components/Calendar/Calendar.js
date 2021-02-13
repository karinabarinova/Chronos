import React from 'react';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.cjs";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const Calendar = () => {
    const events = [{ title: "today's event", date: new Date() }];

    return (
        <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={events}
      />
    )
}

export default Calendar;