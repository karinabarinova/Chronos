import React from 'react'

const EventView = (props) => {
    return (
        <div>
            <div>
                <div><h3>Create an event</h3></div>
                <button>x</button>
            </div>
            <form>
                <label>What do you want to do?</label>
                <div>
                    <input type="text" placeholder="e.g.: Buy Milk"></input>
                    <div>
                        <button>colors</button>
                    </div>
                </div>
                <label>When?</label>
                <div>
                    <input type="date" />
                    <input type="time" />
                </div>
                <label>Who will participate?</label>
                <div>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default EventView
