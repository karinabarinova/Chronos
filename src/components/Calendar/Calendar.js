import React from 'react';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const Calendar = () => {
    const events = [{ title: "today's event", date: new Date() }];

    return (
        <FullCalendar
        initialView="dayGridMonth" 
        nowIndicator={true}
        businessHours={{
            daysOfWeek:[ 1, 2, 3, 4, 5 ], // Monday - Friday
            startTime: '9:00', // 9am
            endTime: '18:00', // 6pm
        }}
        weekNumbers={true}
        weekText="Week #"
        dayHeaders={true}
        dayHeaderFormat={{ weekday: 'long', month: 'short', day: 'numeric', omitCommas: true }
        }
        handleWindowResize={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
                    // eventDrop={this.handleEventDrop}
                    // eventClick={this.handleEventClick}
                    // events={this.formatEvents()}
        headerToolbar={{
          left: "prevYear,prev,next,nextYear",
          center: "title,today",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events}
      />
    )
}

export default Calendar;