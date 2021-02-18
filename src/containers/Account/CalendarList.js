import React, { Component } from 'react'
import Checkbox from './CalendarList.elements';

class CalendarList extends Component {
    state = {check: true}

    handleCheckBoxChange = (event) => {
        this.setState({ checked: event.target.checked })
    }

    editCalendar = (id) => {
        this.props.editCalendar(id)
    }

    render() {
        let list = null;
        if (this.props.calendars) {
            list = this.props.calendars.map((calendar) => {
                return (
                    <div key={calendar.props.id}>
                            <Checkbox id={calendar.props.id} onChange={this.handleCheckBoxChange} canHide={calendar.props.canHide}/>
                            <span onClick={() => this.editCalendar(calendar.props.id)} style={{marginLeft: 8, cursor: "pointer"}}>{calendar.props.name}</span>
                    </div>
                )
            })
        }
        return (
            <div
            style={{
                fontFamily: 'system-ui',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {list}
            </div>
        )
    }
}

export default CalendarList
