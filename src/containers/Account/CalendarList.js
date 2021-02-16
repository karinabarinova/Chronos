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
                return <label
                    key={calendar.props.id}
                    >
                    <Checkbox
                    
                    id={calendar.props.id} 
                    checked={this.state.checked} //?
                    onChange={this.handleCheckBoxChange}
                    />
                    <span style={{marginLeft: 8}}>{calendar.props.name}</span>
                </label>
            })
        }
        console.log(list)
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
