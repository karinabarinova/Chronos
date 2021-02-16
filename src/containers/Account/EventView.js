import React from 'react'

const EventView = (props) => {
    return (
        <div>
            <h3>Create an event</h3>
            <label> Name
            <input type="text" />
            </label>
            <label> Description
            <input type="text" />
            </label>
        </div>
    )
}

export default EventView
