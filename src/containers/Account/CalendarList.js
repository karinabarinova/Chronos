import React, { Component } from 'react'
import Checkbox from './CalendarList.elements';

class CalendarList extends Component {
    state = {check: true}

    handleCheckBoxChange = (event) => {
        this.setState({ checked: event.target.checked })
    }

    render() {
        return (
            <div
            style={{
                fontFamily: 'system-ui',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <label>
                    <Checkbox 
                    checked={this.state.checked}
                    onChange={this.handleCheckBoxChange}
                    />
                    <span style={{marginLeft: 8}}>Holidays</span>
                </label>
                <label>
                    <Checkbox 
                    checked={this.state.checked}
                    onChange={this.handleCheckBoxChange}
                    />
                    <span style={{marginLeft: 8}}>My Calendar</span>
                </label>
            </div>
        )
    }
}

export default CalendarList
