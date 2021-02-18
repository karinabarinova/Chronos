import React, { Component } from 'react'
import Checkbox from './CalendarList.elements';

class CalendarList extends Component {
    state = {check: true}

    handleCheckBoxChange = (event) => {
        this.setState({ checked: event.target.checked })
    }

    render() {
        let list = null;
        if (this.props.calendars) {
            list = this.props.calendars.map((calendar) => {
                return <label key={calendar.props.id}>
                    <Checkbox id={calendar.props.id} onChange={this.handleCheckBoxChange} canHide={calendar.props.canHide}/>
                    <span style={{marginLeft: 8}}>{calendar.props.name}</span>
                </label>
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
